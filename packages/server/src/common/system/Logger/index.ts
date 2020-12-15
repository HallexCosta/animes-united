import { join } from 'path'
import { readFile, writeFile, stat, open } from 'fs/promises'

import { ILogger } from './ILogger'
import { FileError } from '@errors/system/FileError'

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

  public async write(message: string): Promise<void> {
    try {
      const fileExists = await this.verifyLoggerFileExists()
      if (!fileExists) {
        const file = `${Logger.filename}.${Logger.extension}`
        throw new FileError(`Cannot write to file ${file}! File does not exist`)
      }
      const buffer = await readFile(Logger.filePath)
      const textModified = `${buffer.toString()}\n${message}`
      await writeFile(Logger.filePath, textModified)
    } catch (e) {
      console.log(e)
    }
  }

  public async read(): Promise<string> {
    try {
      const fileExists = await this.verifyLoggerFileExists()
      if (!fileExists) {
        const file = `${Logger.filename}.${Logger.extension}`
        throw new FileError(`Cannot read to file ${file}! File does not exist`)
      }
      const buffer = await readFile(Logger.filePath)
      return buffer.toString()
    } catch (e) {
      console.log(e)
      return ''
    }
  }

  public async create(): Promise<void> {
    const fileExists = await this.verifyLoggerFileExists()

    if (!fileExists) {
      const file = await open(Logger.filePath, 'w+')
      await file.close()
    }
  }

  private async verifyLoggerFileExists(): Promise<boolean> {
    try {
      const fileStat = await stat(Logger.filePath)
      if (fileStat.isFile()) {
        return true
      }
      return false
    } catch (e) {
      return false
    }
  }
}
