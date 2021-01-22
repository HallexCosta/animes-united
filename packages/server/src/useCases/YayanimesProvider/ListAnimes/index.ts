import { mongodbURI } from '@common/configs/mongodb'
import { YayanimesProvider } from '@providers/implementations/YayanimesProvider'
import { AnimeRepository } from '@repositories/implementations/AnimeRepository'
import { ListAnimesController } from './ListAnimesController'
import { ListAnimesUseCase } from './ListAnimesUseCase'

const animeRepository = new AnimeRepository(mongodbURI)
const yayanimesProvider = new YayanimesProvider()

const listAnimesUseCase = new ListAnimesUseCase(
  animeRepository,
  yayanimesProvider
)
const listAnimesController = new ListAnimesController(listAnimesUseCase)

export { listAnimesController, listAnimesUseCase }
