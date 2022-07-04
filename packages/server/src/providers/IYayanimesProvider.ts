import { Anime } from '@entities/Anime'
import { Episode } from '@entities/Episode'

import { AnimeCalendar } from './YayanimesProvider'

export interface IYayanimesProvider {
  getBaseURL(): string
  getAnimeNames(): Promise<string[]>
  getAnime(name: string): Promise<Omit<Anime, '_id'> | undefined>
  getRecommendationAnimes(): Promise<Omit<Anime, '_id'>[]>
  getLastReleasesEpisodes(): Promise<Omit<Episode, 'id'>[]>
  getAnimesCalendar(): Promise<AnimeCalendar[]>
}
