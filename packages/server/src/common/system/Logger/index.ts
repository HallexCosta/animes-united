import { join } from 'path'
import { readFile, writeFile, stat } from 'fs/promises'

import { ILogger } from './ILogger'

export type LoggerFileConfig = {
  directorySource?: 'root' | string
  filename: 'console' | string
  extension: 'log' | string
}

export class Logger implements ILogger {
  private static directorySource = 'root'
  private static readonly filename = 'console'
  private static readonly extension = 'log'
  private static filePath: string

  constructor(configs: LoggerFileConfig) {
    Object.assign(this, configs)

    Logger.filePath = this.isRootDirectory()
    Object.freeze(this)
  }

  private isRootDirectory(): string {
    const dir = join(
      __dirname,
      '..',
      '..',
      '..',
      `${Logger.filename}.${Logger.extension}`
    )
    return Logger.directorySource === 'root' ? dir : Logger.directorySource
  }

  public async read(): Promise<string> {
    const buffer = await readFile(Logger.filePath)
    return buffer.toString()
  }

  public async create(): Promise<void> {
    const fileExists = await this.verifyLoggerFileExists()

    if (!fileExists) {
      await writeFile(Logger.filePath, '')
    }
  }

  private async verifyLoggerFileExists(): Promise<boolean> {
    const fileStat = await stat(Logger.filePath)

    return fileStat.isFile()
  }
}
