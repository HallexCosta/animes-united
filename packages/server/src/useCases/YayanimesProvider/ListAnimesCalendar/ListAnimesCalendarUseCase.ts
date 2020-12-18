import { AnimeCalendar } from '@providers/implementations/YayanimesProvider'
import { IYayanimesProvider } from '@providers/IYayanimesProvider'

export class ListAnimesCalendarUseCase {
  constructor(private yayanimesProvider: IYayanimesProvider) {}

  public async execute(): Promise<AnimeCalendar[]> {
    const animesCalendar = await this.yayanimesProvider.getAnimesCalendar()

    if (!animesCalendar || animesCalendar.length === 0) {
      throw new Error('Animes calendar not fond')
    }

    return animesCalendar
  }
}
