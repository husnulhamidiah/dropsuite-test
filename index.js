import fs from 'fs'
import { execSync } from 'child_process'

const dirPath = process.argv.slice(2)
if (!dirPath.length) process.exit(1)

const findCmd = `find ${dirPath} -type f -exec sha1sum {} \\;`

const shasums = execSync(findCmd, {
  encoding: 'utf8',
  maxBuffer: Infinity
})

const maps = shasums
  .split('\n')
  .filter(Boolean)
  .reduce((maps, item) => {
    const [hash, path] = [
      item.substring(0, 40),
      item.substring(40).trim()
    ]

    const count = maps[hash] ? maps[hash].count + 1 : 1
    maps[hash] = { path, count }

    return maps
  }, {})

const top = Object.values(maps)
  .sort((a, b) => b.count - a.count)
  .shift()

const stream = fs.createReadStream(top.path, {
  encoding: 'utf8'
})

stream.on('data', data => {
  console.log(data)
})

stream.on('close', () => {
  console.log(top.count)
})
