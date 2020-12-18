import { config } from '@common/configs/logger'
import { Logger } from '@common/system/Logger'
import { YayanimesProvider } from '@providers/implementations/YayanimesProvider'
import { ListAnimeController } from './ListAnimeController'
import { ListAnimeUseCase } from './ListAnimeUseCase'

const yayanimesProvider = new YayanimesProvider()
const logger = new Logger(config)

const listAnimeUseCase = new ListAnimeUseCase(yayanimesProvider, logger)
const listAnimeController = new ListAnimeController(listAnimeUseCase)

export { listAnimeController, listAnimeUseCase }
