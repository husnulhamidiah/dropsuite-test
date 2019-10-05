import { execSync } from 'child_process'

const dirPath = process.argv.slice(2)
if (!dirPath.length) process.exit(1)

const shasums = execSync(`find ${dirPath} -type f -exec sha1sum {} \\;`)
const results = shasums.toString()
  .split('\n')
  .filter(Boolean)
  .map(item => item.substring(0, 40))

console.log(results)
