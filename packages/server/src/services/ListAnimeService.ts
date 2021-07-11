import { mongodbURI } from '@common/configs/mongodb'
import { Anime } from '@entities'
import { AnimesRepository, IAnimesRepository } from '@repositories'

type ListAnimeDTO = {
  id: string
  category: string
}

export class ListAnimeService {
  private readonly repository: IAnimesRepository

  constructor() {
    this.repository = new AnimesRepository(mongodbURI)
  }

  public async execute({ category, id }: ListAnimeDTO): Promise<Anime> {
    const anime = await this.repository.category(category).findById(id)

    if (!anime) {
      throw new Error('Anime not found')
    }

    return anime
  }
}
