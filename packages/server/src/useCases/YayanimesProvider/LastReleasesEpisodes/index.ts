import { YayanimesProvider } from '@providers/implementations/YayanimesProvider'
import { LastReleasesEpisodesController } from './LastReleasesEpisodesController'
import { LastReleasesEpisodesUseCase } from './LastReleasesEpisodesUseCase'

const yayanimesProvider = new YayanimesProvider()

const lastReleasesEpisodesUseCase = new LastReleasesEpisodesUseCase(
  yayanimesProvider
)

const lastReleasesEpisodesController = new LastReleasesEpisodesController(
  lastReleasesEpisodesUseCase
)

export { lastReleasesEpisodesUseCase, lastReleasesEpisodesController }
