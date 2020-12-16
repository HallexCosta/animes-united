import { Episode } from '@entities/Anime'
import { IYayanimesProvider } from '@providers/IYayanimesProvider'

export class LastReleasesEpisodesUseCase {
  constructor(private yayanimesProvider: IYayanimesProvider) {}

  public async execute(): Promise<Episode[]> {
    const episodes = await this.yayanimesProvider.getLastReleasesEpisodes()

    return episodes
  }
}
