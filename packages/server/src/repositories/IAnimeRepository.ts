import { Anime } from '@entities/Anime'
import { CategoryAnime } from './implementations/AnimeRepository'

export interface IAnimeRepository {
  findAll(): Promise<CategoryAnime[]>
  findByCategory(category: string): Promise<CategoryAnime>
  category(category: string): IAnimeRepository
  save(anime: Anime): Promise<boolean>
  deleteByName(name: string): Promise<boolean>
}
