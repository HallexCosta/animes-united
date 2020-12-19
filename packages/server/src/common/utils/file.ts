import fs from 'fs'

import { FileError } from '@errors/system/FileError'

type EmptyFile = {
  filename: string
  extension: string
  directorySave: string
  dataContent: any
}

type RequestFile = {
  directorySource: string
  filename: string
  extension: string
  createThisFileIfNotExists?: boolean
}

export function verifyFileExists(filePath: string): boolean {
  return fs.existsSync(filePath)
}

export function getFile({
  directorySource,
  filename,
  extension,
  createThisFileIfNotExists = false
}: RequestFile): string | false {
  const fullDirectory = `${directorySource}/${filename}.${extension}`

  if (createThisFileIfNotExists) {
    if (!verifyFileExists(fullDirectory)) {
      fs.writeFileSync(fullDirectory, '')
    }
  }

  if (!verifyFileExists(fullDirectory)) {
    throw new FileError(`File ${filename}.${extension} not found`)
  }

  return fs.readFileSync(fullDirectory, 'utf-8')
}

export function saveFile(data: EmptyFile): boolean {
  const { filename, extension, directorySave, dataContent } = data

  let writeData: string = dataContent

  if (extension === 'json') {
    writeData = JSON.stringify(dataContent, null, 2)
  }

  if (extension === 'js') {
    writeData = `module.exports = ${JSON.stringify(dataContent, null, 2)}`
  }

  console.log(`Directory saved: ${directorySave}/${filename}.${extension}`)

  fs.writeFile(`${directorySave}/${filename}.${extension}`, writeData, err => {
    if (err) throw new FileError('Something went wrong.')
  })

  return true
}
