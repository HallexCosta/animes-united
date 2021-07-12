import { mongodbURI } from '@common/configs/mongodb'
import {
  AnimeCategory,
  AnimesRepository,
  IAnimesRepository
} from '@repositories'
import { Anime } from '@entities'

export class ListAnimeRecommendationService {
  private readonly repository: IAnimesRepository
  private readonly amountRecommendedAnime = 8

  constructor() {
    this.repository = new AnimesRepository(mongodbURI)
  }

  private async shuffle(animes: Anime[], amount?: number) {
    for (let i = 0; i < animes.length - 1; i++) {
      const j = i + Math.floor(Math.random() * (animes.length - i))

      const temp = animes[j]
      animes[j] = animes[i]
      animes[i] = temp
    }

    if (amount) {
      return animes.slice(-(amount - animes.length))
    }

    return animes
  }

  private merge(categories: AnimeCategory[]): Anime[] {
    const animes: Anime[] = []

    for (const category of categories) {
      animes.push(...category.animes)
    }

    return animes
  }

  public async execute(): Promise<Anime[]> {
    const animes = await this.repository.findAll()

    return this.shuffle(this.merge(animes), this.amountRecommendedAnime)
  }
}
