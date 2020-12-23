import { Anime, Episode } from '@entities/Anime'
import { AnimeCalendar } from './implementations/YayanimesProvider'

export interface IYayanimesProvider {
  getBaseURL(): string
  getAnimeNames(): Promise<string[]>
  getAnime(name: string): Promise<Anime | undefined>
  getRecommendationAnimes(): Promise<Anime[]>
  getLastReleasesEpisodes(): Promise<Episode[]>
  getAnimesCalendar(): Promise<AnimeCalendar[]>
}
