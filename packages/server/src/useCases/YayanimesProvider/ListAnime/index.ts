import { mongodbURI } from '@common/configs/mongodb'
import { config } from '@common/configs/logger'
import { Logger } from '@common/system/Logger'
import { YayanimesProvider } from '@providers/implementations/YayanimesProvider'
import { AnimeRepository } from '@repositories/implementations/AnimeRepository'
import { ListAnimeController } from './ListAnimeController'
import { ListAnimeUseCase } from './ListAnimeUseCase'

const animeRepository = new AnimeRepository(mongodbURI)

const yayanimesProvider = new YayanimesProvider()
const logger = new Logger(config)

const listAnimeUseCase = new ListAnimeUseCase(
  animeRepository,
  yayanimesProvider,
  logger
)

const listAnimeController = new ListAnimeController(listAnimeUseCase)

export { listAnimeController, listAnimeUseCase }
