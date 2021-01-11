import { IYayanimesProvider } from '@providers/IYayanimesProvider'

type CategoryNames = {
  category: string
  data: string[]
}

export class ListAnimesUseCase {
  public constructor(private yayanimesProvider: IYayanimesProvider) {}

  private separateByCategory(names: string[]) {
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
  }

  public async execute(): Promise<string[]> {
    const names = await this.yayanimesProvider.getAnimeNames()

    if (names.length === 0) {
      throw new Error('No anime found')
    }

    return names
  }
}
