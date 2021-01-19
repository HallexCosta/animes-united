import { Episode } from '@entities/Anime'
import { IYayanimesProvider } from '@providers/IYayanimesProvider'
import { AnimeDatabase } from '@repositories/implementations/AnimeRepository'
import { ObjectId } from 'mongodb'

type CategoryNames = {
  category: string
  data: string[]
}

type CategoryAnimes = {
  category: string
  data: AnimeDatabase[]
}

export class ListAnimesUseCase {
  public constructor(private yayanimesProvider: IYayanimesProvider) {}

  private separateByCategory(names: string[]): CategoryNames[] {
    const namesByCategories: CategoryNames[] = []

    for (const name of names) {
      const category: string = name.match(/^[A-Z]/gi)
        ? name[0].toUpperCase()
        : 'Other'

      const categoryFound = namesByCategories.find(
        namesByCategory => namesByCategory.category === category
      )

      if (!categoryFound) {
        namesByCategories.push({
          category,
          data: [name]
        })
      }

      if (categoryFound) {
        for (const namesByCategory of namesByCategories) {
          if (namesByCategory.category === category) {
            namesByCategory.data.push(name)
            break
          }
        }
      }
    }

    return namesByCategories
  }

  private categoryAnimesDataDefault(
    categoryNames: CategoryNames[]
  ): CategoryAnimes[] {
    return categoryNames.map<CategoryAnimes>(categoryData => ({
      category: categoryData.category,
      data: categoryData.data.map<AnimeDatabase>(name => ({
        _id: new ObjectId(),
        name,
        genre: 'Unknown',
        imageURL:
          'http://192.168.0.11:3333/static/images/anime-thumbnail-default.jpg',
        rating: 0,
        synopsis: 'Unknown',
        status: 'Unknown',
        streamings: {
          episodes: [] as Episode[],
          ovas: [] as Episode[]
        },
        studio: 'Unknown',
        yearRelease: 0
      }))
    }))
  }

  public async execute(): Promise<CategoryAnimes[]> {
    const categoriesAnimes = this.categoryAnimesDataDefault(
      this.separateByCategory(await this.yayanimesProvider.getAnimeNames())
    )

    if (categoriesAnimes.length === 0) {
      throw new Error('No anime found')
    }

    return categoriesAnimes
  }
}
