import { mongodbURI } from '@common/configs/mongodb'

import AnimesRepository, { AnimesRepositoryMethods, AnimeCategory } from '@repositories/AnimesRepository'

export class ListAnimesService {
  private readonly repository: AnimesRepositoryMethods

  public constructor() {
    this.repository = new AnimesRepository(mongodbURI)
  }

  public async execute(): Promise<AnimeCategory[]> {
    const animes = await this.repository.findAll()

    return animes
  }
}
