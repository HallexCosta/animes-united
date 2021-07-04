import { writeFile } from 'fs'
import { YayanimesProvider } from '@providers'

const provider = new YayanimesProvider()

provider.getAnimeNames().then(names => {
  const animesNamesJSON = `export const names = ${JSON.stringify(
    names,
    null,
    2
  )}`

  writeFile(`${__dirname}/anime-names.ts`, animesNamesJSON, err => {
    if (err) console.log(err)
  })
})
