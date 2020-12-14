import { listAnimeController } from '@useCases/ListAnime'
import { Router, Request, Response } from 'express'

const routes: Router = Router()

routes.get('/animes/:name', (request: Request, response: Response) => {
  return listAnimeController.handle(request, response)
})

export { routes }
