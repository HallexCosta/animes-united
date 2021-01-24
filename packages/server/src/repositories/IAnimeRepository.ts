import { ObjectId } from 'mongodb'
import { Anime } from '@entities/Anime'
import { CategoryAnime } from './implementations/AnimeRepository'

export interface IAnimeRepository {
  findAll(): Promise<CategoryAnime[]>
  findByCategory(category?: string): Promise<CategoryAnime>
  category(category: string): IAnimeRepository
  save(anime: Anime): Promise<boolean>
  updateById(anime: Omit<Anime, '_id'>, _id: ObjectId): Promise<boolean>
  findByName(name: string): Promise<Anime | undefined>
  deleteByName(name: string): Promise<boolean>
}
