import { IYayanimesProvider } from '@providers/IYayanimesProvider'

type CategoryNames = {
  category: string
  data: string[]
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

  public async execute(): Promise<CategoryNames[]> {
    const names = this.separateByCategory(
      await this.yayanimesProvider.getAnimeNames()
    )

    if (names.length === 0) {
      throw new Error('No anime found')
    }

    return names
  }
}
