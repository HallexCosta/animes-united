import { IYayanimesProvider } from '@providers/IYayanimesProvider'

export class ListAnimesUseCase {
  public constructor(private yayanimesProvider: IYayanimesProvider) {}

  public async execute(): Promise<string[]> {
    const names = await this.yayanimesProvider.getAnimeNames()

    if (names.length === 0) {
      throw new Error('No anime found')
    }

    return names
  }
}
