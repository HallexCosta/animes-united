import { YayanimesProvider } from '@providers/implementations/YayanimesProvider'
import { ListAnimesController } from './ListAnimesController'
import { ListAnimesUseCase } from './ListAnimesUseCase'

const yayanimesProvider = new YayanimesProvider()

const listAnimesUseCase = new ListAnimesUseCase(yayanimesProvider)
const listAnimesController = new ListAnimesController(listAnimesUseCase)

export { listAnimesController, listAnimesUseCase }
