import { Anime, Episode } from '@entities/Anime'

export interface IYayanimesProvider {
  getBaseURL(): string
  getAnimeNames(): Promise<string[]>
  getAnime(name: string): Promise<Anime | undefined>
  getRecommendationAnimes(): Promise<Anime[]>
  getLastReleasesEpisodes(): Promise<Episode[]>
}
