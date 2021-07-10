import { mongodbURI } from '@common/configs/mongodb'
import {
  AnimesRepository,
  IAnimesRepository,
  AnimeCategory
} from '@repositories'

export class ListAnimesService {
  private readonly repository: IAnimesRepository

  public constructor() {
    this.repository = new AnimesRepository(mongodbURI)
  }

  public async execute(): Promise<AnimeCategory[]> {
    const animes = await this.repository.findAll()

    return animes
  }
}
