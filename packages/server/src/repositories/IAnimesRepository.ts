import { Anime } from '@entities'

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

export interface IAnimesRepository {
  category(category: string): IAnimesRepository
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
