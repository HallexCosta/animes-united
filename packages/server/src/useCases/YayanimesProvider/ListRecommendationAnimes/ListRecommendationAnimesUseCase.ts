import { Anime } from '@entities/Anime'
import { IYayanimesProvider } from '@providers/IYayanimesProvider'

export class ListRecommendationAnimesUseCase {
  public constructor(private yayanimesProvider: IYayanimesProvider) {}

  public async execute(): Promise<Anime[]> {
    const animes = await this.yayanimesProvider.getRecommendationAnimes()

    if (animes.length === 0) {
      throw new Error('No anime found')
    }

    return animes
  }
}
