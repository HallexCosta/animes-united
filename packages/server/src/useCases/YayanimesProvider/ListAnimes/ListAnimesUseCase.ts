import { Anime, Episode } from '@entities'
import { IYayanimesProvider } from '@providers/IYayanimesProvider'

type CategoryNames = {
  category: string
  data: string[]
}

type CategoryAnimes = {
  category: string
  data: Anime[]
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
    const defaultStringData = 'Unknown'
    const defaultNumberData = 0
    const imageURL =
      'http://192.168.0.11:3333/static/images/anime-thumbnail-default.jpg'
    const streamings = {
      episodes: [] as Episode[],
      ovas: [] as Episode[]
    }

    return categoryNames.map<CategoryAnimes>(categoryData => ({
      category: categoryData.category,
      data: categoryData.data.map<Anime>(
        name =>
          new Anime({
            name,
            genre: defaultStringData,
            imageURL,
            rating: defaultNumberData,
            synopsis: defaultStringData,
            status: defaultStringData,
            streamings,
            studio: defaultStringData,
            yearRelease: defaultNumberData
          })
      )
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
