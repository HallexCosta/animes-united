import fs from 'fs'

export type EmptyFile = {
  filename: string
  extension: string
  directorySave: string
  dataContent: any
}

class FileError extends Error {}

export function getFile(dirFile: string): string {
  return fs.readFileSync(dirFile, 'utf-8')
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
