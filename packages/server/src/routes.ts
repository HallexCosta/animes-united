import { Router } from 'express'

import {
  ListAnimeController,
  ListAnimeCategoryController,
  ListAnimesCalendarController,
  ListAnimesController,
  ListAnimeRecommendationController,
  ListLatestEpisodesReleaseController,
  UpdateAnimeController
} from '@controllers'

const listAnimeController = new ListAnimeController()
const listAnimesController = new ListAnimesController()
const listAnimesCalendarController = new ListAnimesCalendarController()
const listAnimeCategoryController = new ListAnimeCategoryController()
const listAnimeRecommendationController = new ListAnimeRecommendationController()
const listLatestEpisodesReleaseController = new ListLatestEpisodesReleaseController()
const updateAnimeController = new UpdateAnimeController()

const routes: Router = Router()

routes
  .get('/animes', listAnimesController.handle)
  .get('/animes/recommendation', listAnimeRecommendationController.handle)
  .get(
    '/animes/latest-episodes-release',
    listLatestEpisodesReleaseController.handle
  )
  .get('/animes/calendar', listAnimesCalendarController.handle)
  .get('/animes/:category', listAnimeCategoryController.handle)
  .patch('/animes/:category', updateAnimeController.handle)
  .get('/animes/:category/:id', listAnimeController.handle)

export { routes }
