import { Anime, Streamings } from '@entities'
import { IYayanimesProvider } from '@providers/IYayanimesProvider'
import { AnimeRepository } from '@repositories/implementations/AnimeRepository'

type CategoryNames = {
  category: string
  data: string[]
}

type CategoryAnimes = {
  category: string
  data: Anime[]
}

export class ListAnimesUseCase {
  public constructor(
    private animeRepository: AnimeRepository,
    private yayanimesProvider: IYayanimesProvider
  ) {}

  private separateByCategory(names: string[]): CategoryNames[] {
    const namesByCategories: CategoryNames[] = []

    for (const name of names) {
      const category: string = name.match(/^[A-Z]/gi)
        ? name[0].toUpperCase()
        : '1'

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
      'http://192.168.0.9:3333/static/images/anime-thumbnail-default.jpg'
    const streamings = new Streamings()

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

  private async saveManyOnDatabase(
    categoriesAnimes: CategoryAnimes[]
  ): Promise<boolean> {
    for (const categoryAnime of categoriesAnimes) {
      for (const anime of categoryAnime.data) {
        await this.animeRepository.category(categoryAnime.category).save(anime)
      }
    }

    return true
  }

  private verifyAllCategoryExists(animes: CategoryAnimes[]): boolean {
    const allCategoriesLetters: string[] = []

    for (const anime of animes) {
      allCategoriesLetters.push(anime.category)
    }

    return allCategoriesLetters.length === 27
  }

  public async execute(): Promise<CategoryAnimes[]> {
    const animes = await this.animeRepository.findAll()

    if (animes.length === 27) {
      return animes
    }

    const categoriesAnimes = this.categoryAnimesDataDefault(
      this.separateByCategory(await this.yayanimesProvider.getAnimeNames())
    )

    const saved = await this.saveManyOnDatabase(categoriesAnimes)
    console.log('saveManyOnDatabase', saved)

    if (categoriesAnimes.length === 0) {
      throw new Error('No anime found')
    }

    return categoriesAnimes
  }
}
