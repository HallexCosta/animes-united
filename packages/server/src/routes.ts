import { Router, Request, Response } from 'express'

import { lastReleasesEpisodesController } from '@useCases/YayanimesProvider/LastReleasesEpisodes'
import { listAnimesCalendarController } from '@useCases/YayanimesProvider/ListAnimesCalendar'

import {
  ListAnimeController,
  ListAnimeCategoryController,
  ListAnimesController,
  ListAnimeRecommendationController,
  UpdateAnimeController
} from '@controllers'

const listAnimeController = new ListAnimeController()
const listAnimesController = new ListAnimesController()
const listAnimeCategoryController = new ListAnimeCategoryController()
const listAnimeRecommendationController = new ListAnimeRecommendationController()
const updateAnimeController = new UpdateAnimeController()

const routes: Router = Router()

routes
  .get('/animes', listAnimesController.handle)
  .get('/animes/recommendation', listAnimeRecommendationController.handle)
  .get(
    '/animes/last-releases-episodes',
    (request: Request, response: Response) => {
      return lastReleasesEpisodesController.handle(request, response)
    }
  )
  .get('/animes/calendar', (request: Request, response: Response) => {
    return listAnimesCalendarController.handle(request, response)
  })
  .get('/animes/:category', listAnimeCategoryController.handle)
  .patch('/animes/:category', updateAnimeController.handle)
  .get('/animes/:category/:id', listAnimeController.handle)

export { routes }
