import { mongodbURI } from '@common/configs/mongodb'
import { Anime } from '@entities'
import { AnimesRepository, IAnimesRepository } from '@repositories'

type ListAnimeCategoryDTO = {
  category: string
}

export class ListAnimeCategoryService {
  private readonly repository: IAnimesRepository

  constructor() {
    this.repository = new AnimesRepository(mongodbURI)
  }

  public async execute({ category }: ListAnimeCategoryDTO): Promise<Anime[]> {
    return await this.repository.category(category).findByCategory()
  }
}
