import { listAnimeController } from '@useCases/ListAnime'
import { listAnimesController } from '@useCases/ListAnimes'
import { Router, Request, Response } from 'express'

const routes: Router = Router()

routes.get('/animes/:name', (request: Request, response: Response) => {
  return listAnimeController.handle(request, response)
})

routes.get('/animes', (request: Request, response: Response) => {
  return listAnimesController.handle(request, response)
})

export { routes }
