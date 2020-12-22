import { Collection, MongoError, ObjectId } from 'mongodb'

import { Anime } from '@entities/Anime'
import { IAnimeRepository } from '@repositories/IAnimeRepository'
import { MongoDB } from './MongoDB'

export type CategoryAnime = {
  category: string
  data: AnimeDatabase[]
}

type AnimeDatabase = Anime & {
  _id: ObjectId
}

export class AnimeRepository extends MongoDB implements IAnimeRepository {
  constructor(uri: string) {
    super(uri)
  }

  public async findAll(): Promise<CategoryAnime[]> {
    const db = await this.connect()

    const animes: CategoryAnime[] = []

    const collections: Collection<AnimeDatabase>[] = await db.collections()

    for (const collection of collections) {
      animes.push({
        category: collection.collectionName,
        data: await collection.find().toArray()
      })
    }

    return this.orderByAlphabetical(animes)
  }

  public async findByCategory(category?: string): Promise<CategoryAnime> {
    const db = await this.connect()
    const collectionName = category || this.collectionName

    if (!collectionName) {
      throw new Error('Collection name not defined')
    }

    const collection = db.collection(collectionName)
    return {
      category: collectionName,
      data: await collection.find<AnimeDatabase>().toArray()
    }
  }

  public category(category: string): IAnimeRepository {
    return this.collection(category.toUpperCase())
  }

  public async save(anime: Anime): Promise<boolean> {
    const db = await this.connect()

    /// TESTAR ISSSO
    if (!this.collectionName) {
      throw new Error('Collection name not defined')
    }

    const collection = db.collection(this.collectionName)
    const inserted = await collection.insertOne(anime)

    if (inserted.result.ok) {
      return true
    }

    throw new Error('Failed to save anime')
  }

  public async deleteByName(name: string): Promise<boolean> {
    const db = await this.connect()

    if (!this.collectionName) {
      throw new Error('Collection name not defined')
    }

    const collection = db.collection(this.collectionName)
    const deleted = await collection.deleteOne({
      name
    })

    if (!deleted.result.ok) {
      throw new MongoError('Failed to delete anime')
    }

    return true
  }

  private orderByAlphabetical(categories: CategoryAnime[]): CategoryAnime[] {
    return categories.sort((a, b) =>
      a.category > b.category ? 1 : b.category > a.category ? -1 : 0
    )
  }
}
