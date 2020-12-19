import { Db, MongoClient } from 'mongodb'

export abstract class MongoDB {
  private cachedDb: Db | null = null
  protected collectionName = ''

  constructor(private uri: string) {}

  protected async connect(): Promise<Db> {
    if (this.cachedDb) {
      return this.cachedDb
    }

    const client = await MongoClient.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const url = new URL(this.uri)
    const dbName = url.pathname.substr(1)

    const db = client.db(dbName)

    this.cachedDb = db

    return db
  }

  protected collection(collectionName: string): this {
    this.collectionName = collectionName
    return this
  }
}
