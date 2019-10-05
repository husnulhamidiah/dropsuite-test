import { execSync } from 'child_process'

const dirPath = process.argv.slice(2)
if (!dirPath.length) process.exit(1)

const shasums = execSync(`find ${dirPath} -type f -exec sha1sum {} \\;`)
const results = shasums.toString()
  .split('\n')
  .filter(Boolean)
  .map(item => item.substring(0, 40))

console.log(results)

const uniqHashes = [...new Set(results)]
const topHash = uniqHashes.reduce(([acc, hash], item) => {
  const counter = results.filter(result => result === item).length
  if (counter >= acc) {
    const [acc, hash] = [counter, item]
    return [acc, hash]
  }
  return [acc, hash]
}, [1, null])

console.log(topHash)
