import { MongoClient, Db } from 'mongodb'
import { mongodbURITest } from '@common/configs/mongodb'

let cachedDb: Db
let mongoClient: MongoClient

async function connection() {
  if (cachedDb) {
    return cachedDb
  }

  const client = await MongoClient.connect(mongodbURITest, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  mongoClient = client

  const url = new URL(mongodbURITest)
  const dbName = url.pathname.substr(1)

  const db = client.db(dbName)

  cachedDb = db

  return db
}

async function dropCollections() {
  const db = await connection()
  const drops = []

  for (const collection of await db.collections()) {
    drops.push(await db.collection(collection.collectionName).drop())
  }

  const fails = !!drops.find(drop => drop === false)
  const dropped = !fails

  console.log('Teardown: Database for test dropped', dropped)
}

async function disconnect() {
  await mongoClient.close()
}

async function teardown() {
  await connection()
  await dropCollections()
  await disconnect()

  console.log('Finish Teardown')
}

after(teardown)
