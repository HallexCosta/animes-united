const { MongoClient } = require('mongodb')
const { mongodbURITest } = require('./src/common/configs/mongodb')

let cachedDb

async function connection() {
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

module.exports = async () => {
  const db = await connection()
  const drops = []
  for (const collection of await db.collections()) {
    drops.push(await db.collection(collection.collectionName).drop())
  }
  const fails = !!drops.find(drop => drop === false)
  const dropped = !fails
  console.log('Teardown: Database for test dropped', dropped)
}
