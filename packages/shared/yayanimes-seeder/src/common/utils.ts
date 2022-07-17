import fs from 'fs'

export default class Utils {
  static getValueFromArgs(...args: string[]) {
    for (const argIndex in process.argv) {
      if (args.includes(process.argv[Number(argIndex)]))
        return process.argv[Number(argIndex) + 1]
    }
    return null
  }
  static async createAndSaveFile(pathName: string, content: string) {
    await fs.promises.writeFile(pathName, content)
    return true
  }
  static async createDirectory(directory: string) {
    if (fs.existsSync(directory)) return false
    await fs.promises.mkdir(directory, { recursive: true })
    return true
  }
}
