import fs from 'fs'
import path from 'path'

type DataContent = string | [] | {}

export type EmptyFile = {
  filename: string
  extension: string
  directorySave: string
  dataContent: DataContent
  isJSON: boolean
}

export function saveFile(data: EmptyFile): DataContent {
  const { filename, extension, directorySave, dataContent, isJSON } = data

  const dataText = isJSON
    ? JSON.stringify(dataContent, null, 2)
    : (dataContent as string)

  fs.writeFile(
    path.join(__dirname, directorySave, `${filename}.${extension}`),
    dataText,
    err => {
      if (err) throw new Error('something went wrong.')
    }
  )

  return true
}
