import { listAnimeController } from '@useCases/ListAnime'
import { listAnimesController } from '@useCases/ListAnimes'
import { listRecommendationAnimesController } from '@useCases/ListRecommendationAnimes'
import { Router, Request, Response } from 'express'

const routes: Router = Router()

routes.get('/animes', (request: Request, response: Response) => {
  return listAnimesController.handle(request, response)
})

routes.get('/animes/recommendation', (request: Request, response: Response) => {
  return listRecommendationAnimesController.handle(request, response)
})

routes.get('/animes/:name', (request: Request, response: Response) => {
  return listAnimeController.handle(request, response)
})

export { routes }
