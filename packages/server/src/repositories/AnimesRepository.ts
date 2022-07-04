import { Collection } from 'mongodb'

import { MongoDB } from './MongoDB'

import { Anime } from '@entities/Anime'

export type AnimeCategory = {
  animes: Anime[]
  category: string
}

export type UpdatedAnime = {
  updatedCount: number
}

export type DeletedAnime = {
  deletedCount: number
}

export interface AnimesRepositoryMethods {
  category(category: string): AnimesRepositoryMethods
  create(anime: Omit<Anime, '_id' | 'created_at' | 'updated_at'>): Anime
  findAll(): Promise<AnimeCategory[]>
  findByCategory(category?: string): Promise<Anime[]>
  findById(_id: string): Promise<Anime | null>
  findByName(name: string): Promise<Anime | null>
  updateById(_id: string, anime: Anime): Promise<UpdatedAnime>
  updateByName(name: string, anime: Anime): Promise<UpdatedAnime>
  deleteById(_id: string): Promise<DeletedAnime>
  deleteByName(name: string): Promise<DeletedAnime>
  save(anime: Anime): Promise<Anime>
  saveMany(animes: Anime[]): Promise<Anime[]>
}

export default class AnimesRepository extends MongoDB implements AnimesRepositoryMethods {
  constructor(uri: string) {
    super(uri);
  }

  public category(category: string): AnimesRepositoryMethods {
    return this.collection(category.toUpperCase())
  }

  public create(anime: Omit<Anime, '_id'>): Anime {
    return new Anime(anime)
  }

  public async findAll(): Promise<AnimeCategory[]> {
    const db = await this.connect()

    const categories: AnimeCategory[] = []

    const collections: Collection<Anime>[] = await db.collections()

    for (const collection of collections) {
      const animes = await collection.find<Anime>().toArray()

      const signedAnimes = animes.map(this.signAnime)

      const category = collection.collectionName

      categories.push({
        category,
        animes: signedAnimes
      })
    }

    return this.orderByAlphabetical(categories)
  }

  public async findByCategory(category?: string): Promise<Anime[]> {
    if (!category) {
      category = this.collectionName
    }

    if (!category) {
      throw new Error('Category not defined')
    }

    const db = await this.connect()

    const collection = db.collection(category)

    const animes = await collection.find<Anime>().toArray()

    return animes.map(this.signAnime)
  }

  public async findById(_id: string): Promise<Anime | null> {
    if (!this.collectionName) {
      throw new Error('Category not defined')
    }

    const db = await this.connect()

    const collection = db.collection(this.collectionName)

    const anime = await collection.findOne<Anime>({
      _id
    })

    if (anime) {
      return this.signAnime(anime)
    }

    return anime
  }

  public async findByName(name: string): Promise<Anime | null> {
    if (!this.collectionName) {
      throw new Error('Category not defined')
    }

    const db = await this.connect()

    const collection = db.collection(this.collectionName)

    const anime = await collection.findOne<Anime>({
      name
    })

    if (!anime) {
      return null
    }

    return this.signAnime(anime)
  }

  public async updateById(_id: string, anime: Anime): Promise<UpdatedAnime> {
    if (!this.collectionName) {
      throw new Error('Category not defined')
    }

    const db = await this.connect()

    const collection = db.collection(this.collectionName)

    const updatedAnime = await collection.updateOne(
      {
        _id
      },
      { $set: anime }
    )

    const updatedCount = updatedAnime.result.nModified

    return {
      updatedCount
    }
  }

  public async updateByName(name: string, anime: Anime): Promise<UpdatedAnime> {
    if (!this.collectionName) {
      throw new Error('Category not defined')
    }

    const db = await this.connect()

    const collection = db.collection(this.collectionName)

    const updatedAnime = await collection.updateOne(
      {
        name
      },
      { $set: anime }
    )

    const updatedCount = updatedAnime.result.nModified

    return {
      updatedCount
    }
  }

  public async deleteById(_id: string): Promise<DeletedAnime> {
    if (!this.collectionName) {
      throw new Error('Category not defined')
    }

    const db = await this.connect()

    const collection = db.collection(this.collectionName)

    const deletedAnime = await collection.deleteOne({
      _id
    })

    let deletedCount = deletedAnime.deletedCount

    if (!deletedCount) {
      deletedCount = 0
    }

    return {
      deletedCount
    }
  }

  public async deleteByName(name: string): Promise<DeletedAnime> {
    if (!this.collectionName) {
      throw new Error('Category not defined')
    }

    const db = await this.connect()

    const collection = db.collection(this.collectionName)

    const deletedAnime = await collection.deleteOne({
      name
    })

    let deletedCount = deletedAnime.deletedCount

    if (!deletedCount) {
      deletedCount = 0
    }

    return {
      deletedCount
    }
  }

  public async save(anime: Anime): Promise<Anime> {
    if (!this.collectionName) {
      throw new Error('Category not defined')
    }

    const db = await this.connect()

    const collection = db.collection(this.collectionName)

    await collection.insertOne(anime)

    return this.signAnime(anime)
  }

  public async saveMany(animes: Anime[]): Promise<Anime[]> {
    if (!this.collectionName) {
      throw new Error('Category not defined')
    }

    const db = await this.connect()

    const collection = db.collection(this.collectionName)

    await collection.insertMany(animes)

    return animes.map(this.signAnime)
  }

  private signAnime(anime: Anime): Anime {
    return new Anime(anime)
  }

  private orderByAlphabetical(categories: AnimeCategory[]): AnimeCategory[] {
    return categories.sort((a, b) =>
      a.category > b.category ? 1 : b.category > a.category ? -1 : 0
    )
  }
}
