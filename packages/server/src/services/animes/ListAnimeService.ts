import { mongodbURI } from '@common/configs/mongodb'

import { Anime } from '@entities/Anime'

import AnimesRepository, {
  AnimesRepositoryMethods
} from '@repositories/AnimesRepository'

type ListAnimeDTO = {
  id: string
  category: string
}

export class ListAnimeService {
  private readonly repository: AnimesRepositoryMethods

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
