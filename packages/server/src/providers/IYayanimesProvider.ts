import { Anime } from '@entities/Anime'

export interface IYayanimesProvider {
  getBaseURL(): string
  getAnimeNames(): Promise<string[]>
  getAnime(name: string): Promise<Anime | undefined>
}
