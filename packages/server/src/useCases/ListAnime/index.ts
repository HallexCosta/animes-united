import { YayanimesProvider } from '@providers/implementations/YayanimesProvider'
import { ListAnimeController } from './ListAnimeController'
import { ListAnimeUseCase } from './ListAnimeUseCase'

const yayanimesProvider = new YayanimesProvider()

const listAnimeUseCase = new ListAnimeUseCase(yayanimesProvider)
const listAnimeController = new ListAnimeController(listAnimeUseCase)

export { listAnimeController, listAnimeUseCase }
