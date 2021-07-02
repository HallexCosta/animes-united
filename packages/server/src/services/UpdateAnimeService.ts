import { mongodbURI } from '@common/configs/mongodb'
import { Anime } from '@entities'
import { IYayanimesProvider, YayanimesProvider } from '@providers'
import { IAnimeRepository, AnimeRepository } from '@repositories'
import { ObjectId } from 'mongodb'

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

  async updateAnimeByIdWithProviderData(
    name: string,
    id: ObjectId
  ): Promise<Anime> {
    const animeFromProvider = await this.yayanimesProvider.getAnime(name)

    if (!animeFromProvider) {
      throw new Error('Anime not found on Provider')
    }

    const anime = new Anime(animeFromProvider, id)

    await this.animeRepository.updateById(anime, anime._id)

    return anime
  }

  async checkForNeedUpdateAnime(anime: Anime): Promise<Anime> {
    if (anime.createdAt === anime.updatedAt) {
      return await this.updateAnimeByIdWithProviderData(anime.name, anime._id)
    }

    return anime
  }

  async execute({ name, category }: UpdateAnimeDTO): Promise<Anime> {
    this.animeRepository.category(category)

    const animeFromDatabase = await this.animeRepository.findByName(name)

    if (!animeFromDatabase) {
      throw new Error('Anime not found on Database')
    }

    return await this.checkForNeedUpdateAnime(animeFromDatabase)
  }
}
