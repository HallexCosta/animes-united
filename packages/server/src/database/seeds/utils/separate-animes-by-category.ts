import { writeFile, unlink } from 'fs'
import { separateAnimesByCategory } from './utils'
import { animes } from './animes'

const animesJSON = `export const animes = ${JSON.stringify(
  separateAnimesByCategory(animes),
  null,
  2
)}`

writeFile(`${__dirname}/animes-by-category.ts`, animesJSON, err => {
  if (err) return console.log(err)

  unlink(`${__dirname}/animes.ts`, err => {
    if (err) return console.log(err)
  })
})
