import { ObjectId } from 'mongodb'
import { Anime } from '@entities/Anime'
import { CategoryAnime } from '@repository'

export interface IAnimesRepository {
  findAll(): Promise<CategoryAnime[]>
  findByCategory(category?: string): Promise<CategoryAnime>
  category(category: string): IAnimesRepository
  save(anime: Anime): Promise<boolean>
  updateById(anime: Omit<Anime, '_id'>, _id: ObjectId): Promise<boolean>
  updateByName(anime: Omit<Anime, '_id'>, name: string): Promise<boolean>
  findByName(name: string): Promise<Anime | undefined>
  deleteByName(name: string): Promise<boolean>
}
