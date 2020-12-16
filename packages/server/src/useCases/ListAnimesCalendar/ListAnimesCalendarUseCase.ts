import { AnimeCalendar } from '@providers/implementations/YayanimesProvider'
import { IYayanimesProvider } from '@providers/IYayanimesProvider'

export class ListAnimesCalendarUseCase {
  constructor(private yayanimesProvider: IYayanimesProvider) {}

  public async execute(): Promise<AnimeCalendar[]> {
    const animesCalendar = await this.yayanimesProvider.getAnimesCalendar()

    return animesCalendar
  }
}
