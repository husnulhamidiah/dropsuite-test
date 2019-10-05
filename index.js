import fs from 'fs'
import { execSync } from 'child_process'

const dirPath = process.argv.slice(2)
if (!dirPath.length) process.exit(1)

const findCmd = `find ${dirPath} -type f -exec sha1sum {} \\;`

const shasums = execSync(findCmd, {
  encoding: 'utf8',
  maxBuffer: Infinity
})

const [results, maps] = shasums
  .split('\n')
  .filter(Boolean)
  .reduce(([hashes, maps], item) => {
    const [hash, path] = [
      item.substring(0, 40),
      item.substring(40).trim()
    ]

    hashes.push(hash)
    maps[hash] = path

    return [hashes, maps]
  }, [[], {}])

const uniqHashes = [...new Set(results)]
const topHash = uniqHashes.reduce(([acc, hash], item) => {
  const counter = results.filter(result => result === item).length
  if (counter >= acc) {
    const [acc, hash] = [counter, item]
    return [acc, hash]
  }
  return [acc, hash]
}, [1, null])

const stream = fs.createReadStream(maps[topHash.pop()], {
  encoding: 'utf8'
})

stream.on('data', data => {
  console.log(data)
})

stream.on('close', () => {
  console.log(topHash.pop())
})
