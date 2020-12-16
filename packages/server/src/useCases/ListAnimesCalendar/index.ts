import { YayanimesProvider } from '@providers/implementations/YayanimesProvider'
import { ListAnimesCalendarController } from './ListAnimesCalendarController'
import { ListAnimesCalendarUseCase } from './ListAnimesCalendarUseCase'

const yayanimesProvider = new YayanimesProvider()

const listAnimesCalendarUseCase = new ListAnimesCalendarUseCase(
  yayanimesProvider
)

const listAnimesCalendarController = new ListAnimesCalendarController(
  listAnimesCalendarUseCase
)

export { listAnimesCalendarUseCase, listAnimesCalendarController }
