import { Collection, MongoError, ObjectId } from 'mongodb'

import { MongoDB } from './MongoDB'
import { Anime } from '@entities/Anime'
import { IAnimeRepository } from '@repositories/IAnimeRepository'

import { toUpperFirstCase } from '@common/utils/text'

export type CategoryAnime = {
  category: string
  data: Anime[]
}

export class AnimeRepository extends MongoDB implements IAnimeRepository {
  constructor(uri: string) {
    super(uri)
  }

  public async findAll(): Promise<CategoryAnime[]> {
    const db = await this.connect()

    const animes: CategoryAnime[] = []

    const collections: Collection<Anime>[] = await db.collections()

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
      data: await collection.find<Anime>().toArray()
    }
  }

  public category(category: string): IAnimeRepository {
    return this.collection(category.toUpperCase())
  }

  public async save(anime: Anime): Promise<boolean> {
    const db = await this.connect()

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

  public async updateById(
    anime: Omit<Anime, '_id'>,
    _id: ObjectId
  ): Promise<boolean> {
    const db = await this.connect()

    if (!this.collectionName) {
      throw new Error('Collection name not defined')
    }

    const collection = db.collection(this.collectionName)
    const updated = await collection.updateOne(
      {
        _id
      },
      {
        $set: anime
      }
    )

    if (updated.modifiedCount) {
      return true
    }

    throw new Error('Failed to update anime by id')
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

  public async findByName(name: string): Promise<Anime | undefined> {
    const animes = await this.findAll()
    const animeDataFound = animes.find(anime =>
      anime.data.find(anime => anime.name === toUpperFirstCase(name))
    )

    const animeFound = animeDataFound?.data[0]

    return animeFound
  }

  private orderByAlphabetical(categories: CategoryAnime[]): CategoryAnime[] {
    return categories.sort((a, b) =>
      a.category > b.category ? 1 : b.category > a.category ? -1 : 0
    )
  }
}
