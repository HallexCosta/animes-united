import { mongodbURI } from '@common/configs/mongodb'

import { Anime } from '@entities/Anime'
import { Episode } from '@entities/Episode'
import AnimesRepository, {
  AnimeCategory,
  AnimesRepositoryMethods
} from '@repositories/AnimesRepository'

export class ListLatestEpisodesReleaseService {
  private readonly repository: AnimesRepositoryMethods

  constructor() {
    this.repository = new AnimesRepository(mongodbURI)
  }

  private merge(categories: AnimeCategory[]): Anime[] {
    const animes: Anime[] = []

    for (const category of categories) {
      animes.push(...category.animes)
    }

    return animes
  }

  private bringAmount(animes: Anime[], amount: number) {
    return animes.slice(-(amount - animes.length))
  }

  private sortLatestByRelease(animes: Anime[]): Anime[] {
    return animes.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
  }

  private bringLatestEpisodes(animes: Anime[]): Episode[] {
    const episodes: Episode[] = []

    for (const anime of animes) {
      const lastIndex = anime.streamings.episodes.length - 1

      episodes.push(anime.streamings.episodes[lastIndex])
    }

    return episodes
  }

  public async execute(): Promise<Episode[]> {
    const animes = await this.repository.findAll()

    return this.bringLatestEpisodes(
      this.bringAmount(this.sortLatestByRelease(this.merge(animes)), 6)
    )
  }
}
