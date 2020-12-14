import { YayanimesProvider } from '@providers/implementations/YayanimesProvider'
import { ListRecommendationAnimesController } from './ListRecommendationAnimesController'
import { ListRecommendationAnimesUseCase } from './ListRecommendationAnimesUseCase'

const yayanimesProvider = new YayanimesProvider()

const listRecommendationAnimesUseCase = new ListRecommendationAnimesUseCase(
  yayanimesProvider
)
const listRecommendationAnimesController = new ListRecommendationAnimesController(
  listRecommendationAnimesUseCase
)

export { listRecommendationAnimesController, listRecommendationAnimesUseCase }
