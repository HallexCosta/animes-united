import { mongodbURI } from '@common/configs/mongodb'
import { Anime } from '@entities'
import { IYayanimesProvider, YayanimesProvider } from '@providers'
import { IAnimeRepository, AnimeRepository } from '@repositories'

type UpdateAnimeDTO = {
  name: string
  category: string
}

export class UpdateAnimeService {
  private animeRepository: IAnimeRepository
  private yayanimesProvider: IYayanimesProvider

  constructor() {
    this.animeRepository = new AnimeRepository(mongodbURI)
    this.yayanimesProvider = new YayanimesProvider()
  }

  async execute({ name, category }: UpdateAnimeDTO): Promise<Anime> {
    const animeFromProvider = await this.yayanimesProvider.getAnime(name)

    if (!animeFromProvider) {
      throw new Error('Anime not found on Provider')
    }

    this.animeRepository.category(category)

    const animeFromDatabase = await this.animeRepository.findByName(name)

    if (!animeFromDatabase) {
      throw new Error('Anime not found on Database')
    }

    const anime = new Anime(animeFromProvider, animeFromDatabase._id)

    await this.animeRepository.updateById(anime, anime._id)

    return anime
  }
}
