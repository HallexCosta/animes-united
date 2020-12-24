import { Anime } from '@entities/Anime'
import { AnimeDatabase, CategoryAnime } from './implementations/AnimeRepository'

export interface IAnimeRepository {
  findAll(): Promise<CategoryAnime[]>
  findByCategory(category: string): Promise<CategoryAnime>
  category(category: string): IAnimeRepository
  save(anime: Anime): Promise<boolean>
  findByName(name: string): Promise<AnimeDatabase>
  deleteByName(name: string): Promise<boolean>
}
