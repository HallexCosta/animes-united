import path from 'path'
import { Db, MongoClient } from 'mongodb'

import YayanimesProvider from '@core/YayanimesProvider'

import Utils from '@common/utils'
import AnimeHandler from '@core/animeHandler'

const url = process.env.DB_URL as string
let cachedDb: Db

async function database(url: string) {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const { pathname } = new URL(url)
  const dbName = pathname.substring(1)
  const db = client.db(dbName)
  cachedDb = db
  return cachedDb
}

// load
; (async function load() {
  const yay = new YayanimesProvider()
  const animesHandler = new AnimeHandler()
  const animesNames = await yay.getAnimeNames()

  const emptyAnimesObjects = animesHandler.createEmptyAnimesObject(animesNames)
  const animesCategories = animesHandler.separateAnimesByCategory(emptyAnimesObjects)

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
  const pathName = path.resolve(pathDir, fileName)

  await Utils.createDirectory(pathDir)
  await animesHandler.exportAnimesCategoriesInJSON(
    pathName,
    animesCategories
  )
})()
