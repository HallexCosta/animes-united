import { Router, Request, Response } from 'express'

import { lastReleasesEpisodesController } from '@useCases/YayanimesProvider/LastReleasesEpisodes'
import { listAnimeController } from '@useCases/YayanimesProvider/ListAnime'
import { listAnimesController } from '@useCases/YayanimesProvider/ListAnimes'
import { listAnimesCalendarController } from '@useCases/YayanimesProvider/ListAnimesCalendar'
import { listRecommendationAnimesController } from '@useCases/YayanimesProvider/ListRecommendationAnimes'

const routes: Router = Router()

routes
  .get('/animes', (request: Request, response: Response) => {
    return listAnimesController.handle(request, response)
  })
  .get('/animes/recommendation', (request: Request, response: Response) => {
    return listRecommendationAnimesController.handle(request, response)
  })
  .get(
    '/animes/last-releases-episodes',
    (request: Request, response: Response) => {
      return lastReleasesEpisodesController.handle(request, response)
    }
  )
  .get('/animes/calendar', (request: Request, response: Response) => {
    return listAnimesCalendarController.handle(request, response)
  })
  .get('/animes/:name', (request: Request, response: Response) => {
    return listAnimeController.handle(request, response)
  })

export { routes }
