import { Anime, Episode } from '@entities'
import { AnimeCalendar } from './implementations/YayanimesProvider'

export interface IYayanimesProvider {
  getBaseURL(): string
  getAnimeNames(): Promise<string[]>
  getAnime(name: string): Promise<Omit<Anime, '_id'> | undefined>
  getRecommendationAnimes(): Promise<Omit<Anime, '_id'>[]>
  getLastReleasesEpisodes(): Promise<Omit<Episode, 'id'>[]>
  getAnimesCalendar(): Promise<AnimeCalendar[]>
}
