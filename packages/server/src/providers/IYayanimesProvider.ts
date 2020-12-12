import { AnimeTextData } from '@entities/AnimeTextData'

export interface IYayanimesProvider {
  getBaseURL(): string
  getAnimeNames(): Promise<string[]>
  getAnimeTextData(name: string): Promise<AnimeTextData | undefined>
}
