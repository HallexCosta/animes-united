import { Collection } from 'mongodb'

import { Anime } from '@entities/Anime'
import { IAnimeRepository } from '@repositories/IAnimeRepository'
import { MongoDB } from './MongoDB'

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

  public async findByCategory(category: string): Promise<Anime[]> {
    const db = await this.connect()
    const collection = db.collection(category.toUpperCase())
    return await collection.find<Anime>().toArray()
  }

  public category(category: string): IAnimeRepository {
    return this.collection(category.toUpperCase())
  }

  public async save(anime: Anime): Promise<void> {
    const db = await this.connect()
    const collection = db.collection(this.collectionName)
    await collection.insertOne(anime)
  }

  private orderByAlphabetical(categories: CategoryAnime[]): CategoryAnime[] {
    return categories.sort((a, b) =>
      a.category > b.category ? 1 : b.category > a.category ? -1 : 0
    )
  }
}
