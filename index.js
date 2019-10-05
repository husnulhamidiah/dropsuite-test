/**
 * The application is to count on how many files inside a path with the SAME content.
 * It could have the same name or not.
 * In this case if I pass the folder's path, the script will return me the number of
 * files that have same content. On those folders content1 = content2 = content3,
 * So the application will return content + number. So in this case is: abcdef 3
 *
 * Also you need to return the bigger number of files if there are multiple files
 * with the same content. For example if there are 4 files with content “abcdef” and
 * 5 files with content “abcd” then the return value should be: abcd 5
 *
 * Please take note that the example files are in bytes level, but the code need to
 * be able to handle big files as well. Think of Megabytes, Gigabytes level. And
 * the application need to be able to handle tens / hundreds / thousands / millions
 * of files.
 *
 * The other requirement is I want this app to scan a path dynamically. Means I
 * should be able to scan any folder that I like, without changing anything on the
 * code. It could be a parameter or a config file.
 */

/**
  * NOTE: THIS SOLUTION WILL ONLY WORKS ON LINUX AND MAC MACHINE SINCE IT USES `find`
  * AND `shasum` COMMANDS.
  */

import fs from 'fs'
import { execSync } from 'child_process'

const solution = (dirPath) => {
  const SHA_SUM = {
    linux: { alg: 'sha1sum', length: 40 },
    freebsd: { alg: 'shasum', length: 40 },
    openbsd: { alg: 'shasum', length: 40 },
    darwin: { alg: 'shasum', length: 40 }
  }

  const shasum = SHA_SUM[process.platform]
  if (!shasum) process.exit(1)

  const findCmd = `find ${dirPath} -type f -exec ${shasum.alg} {} \\;`

  /**
   * Execute find command to get all files inside given path and
   * calculate shasum for each file
   */
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

  /**
   * Sort and get maps with highest count
   */
  const top = Object.values(maps)
    .sort((a, b) => b.count - a.count)
    .shift()

  /**
   * Stream and write the content to stdout
   */
  const stream = fs.createReadStream(top.path, {
    encoding: 'utf8'
  })

  stream.on('data', data => {
    console.log(data)
  })

  stream.on('close', () => {
    console.log(top.count)
  })
}

const dirPath = process.argv.slice(2)
if (!dirPath.length) process.exit(1)

solution(dirPath)
