import fs from 'fs'

export type EmptyFile = {
  filename: string
  extension: string
  directorySave: string
  dataContent: any
}

export type RequestFile = {
  directorySource: string
  filename: string
  extension: string
  createThisFileIfNotExists: boolean
}

class FileError extends Error {}

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

  const dataText =
    extension === 'json' ? JSON.stringify(dataContent, null, 2) : dataContent

  if (typeof dataText === 'object') {
    throw new TypeError(
      'It is not possible to write an object type in a text file'
    )
  }

  console.log(`Directory saved: ${directorySave}/${filename}.${extension}`)

  fs.writeFile(`${directorySave}/${filename}.${extension}`, dataText, err => {
    if (err) throw new FileError('Something went wrong.')
  })

  return true
}
