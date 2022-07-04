import { mongodbURI } from '@common/configs/mongodb'

import { Anime } from '@entities/Anime'

import AnimesRepository, {
  AnimesRepositoryMethods
} from '@repositories/AnimesRepository'

type ListAnimeCategoryDTO = {
  category: string
}

export class ListAnimeCategoryService {
  private readonly repository: AnimesRepositoryMethods

  constructor() {
    this.repository = new AnimesRepository(mongodbURI)
  }

  public async execute({ category }: ListAnimeCategoryDTO): Promise<Anime[]> {
    return await this.repository.category(category).findByCategory()
  }
}
