import path from 'path'
import { pipeline } from 'node:stream'
import { Db, MongoClient } from 'mongodb'

import YayanimesProvider from '@core/YayanimesProvider'

import Utils from '@common/utils'
import AnimeHandler from '@core/animeHandler'
import { AnimeProps } from '@domains/anime'

const url = process.env.DB_URL as string
let cachedDb: Db

async function database(url: string) {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const { pathname } = new URL(url)
  const dbName = pathname.substring(1)
  if (cachedDb) return cachedDb
  const db = client.db(dbName)
  cachedDb = db
  return cachedDb
}

// load
; (async function load() {
  const yay = new YayanimesProvider()
  const animesHandler = new AnimeHandler({
    yayanimes: yay
  })
  const animesNames = await yay.getAnimeNames()

  const emptyAnimesObjects = animesHandler.createEmptyAnimesObject(animesNames)
  const emptyAnimesCategories = animesHandler.separateAnimesByCategory(emptyAnimesObjects)

  async function* obtainAnimesDetailsFromCategory(animes: AnimeProps[]) {
    const yay = new YayanimesProvider()
    for (const anime of animes) {
      console.log(`Request anime ${anime.name}`)
      const animeDetails = await yay.getAnime(anime.name)
      yield animeDetails ? animeDetails : anime
    }
  }
  async function obtainAllAnimesDetails() {
    console.log('Starting animes requests')
    const db = await database(url)
    for (const emptyAnimesCategory of emptyAnimesCategories) {
      console.log(`Requesting category ${emptyAnimesCategory.category}`)
      for await (const animeDetails of obtainAnimesDetailsFromCategory(emptyAnimesCategory.animes)) {
        await db.collection(emptyAnimesCategory.category).updateOne({
          name: animeDetails.name
        }, {
          $set: animeDetails
        })
        console.log(`Finished request ${animeDetails.name}`)
        console.log()
      }
    }
  }

  const date = new Date()
  const month = `${date.getMonth() <= 10 ? `0${date.getMonth()}` : date.getMonth()}`
  const day = `${date.getDay() <= 10 ? `0${date.getDay()}` : date.getDay()}`
  const fileName = `${date.getFullYear()}-${month}-${day}-animes.json`
  const folderName = Utils.getValueFromArgs('-s', '--save') // save directory

  if (!folderName)
    throw new Error('Please, defined the directory to save animes json data with "-s"')

  // normalize paths to save animes.json
  const pathDir = path.resolve(__dirname, '..', folderName)
  console.log('pathDir', pathDir)
  const saveTo = path.resolve(pathDir, fileName)

  await Utils.createDirectory(pathDir)
  // save schema animes.json
  await animesHandler.exportAnimesCategoriesInJSON(
    saveTo,
    emptyAnimesCategories
  )
  await obtainAllAnimesDetails()
  const totalAnimes = emptyAnimesCategories.map(a => a.animes.length).reduce((prev, curr) => prev + curr, 0)
  console.log(`Finsh all ${totalAnimes}`)
})()
