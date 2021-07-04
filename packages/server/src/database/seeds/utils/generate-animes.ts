import { writeFile, unlink } from 'fs'
import { names } from './anime-names'

const animes = names.map(name => {
  return {
    name,
    genre: '',
    imageURL: '',
    rating: 0,
    synopsis: '',
    status: '',
    streamings: {
      episodes: [],
      ovas: []
    },
    studio: '',
    yearRelease: 0
  }
})

const animesJSON = `export const animes = ${JSON.stringify(animes, null, 2)}`

writeFile(`${__dirname}/animes.ts`, animesJSON, err => {
  if (err) return console.log(err)

  unlink(`${__dirname}/anime-names.ts`, err => {
    if (err) return console.log(err)
  })
})
