import { MongoClient, Db } from 'mongodb'
import { mongodbURITest } from '@common/configs/mongodb'

let cachedDb: Db

async function _prepareConnection() {
  if (cachedDb) {
    return cachedDb
  }
  const client = await MongoClient.connect(mongodbURITest, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const url = new URL(mongodbURITest)
  const dbName = url.pathname.substr(1)

  const db = client.db(dbName)

  cachedDb = db

  return db
}
async function connection() {
  const db = await _prepareConnection()
  const drops = []
  for (const collection of await db.collections()) {
    drops.push(await db.collection(collection.collectionName).drop())
  }
  const fails = !!drops.find(drop => drop === false)
  const dropped = !fails
  console.log('Teardown: Database for test dropped', dropped)
}

async function teardown() {
  await connection()
  console.log('Finish Teardown')
}

after(teardown)
