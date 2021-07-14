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
  .get('/', listAnimesController.handle)
  .get('/recommendation', listAnimeRecommendationController.handle)
  .get('/latest-episodes-release', listLatestEpisodesReleaseController.handle)
  .get('/calendar', listAnimesCalendarController.handle)
  .get('/:category', listAnimeCategoryController.handle)
  .patch('/:category', updateAnimeController.handle)
  .get('/:category/:id', listAnimeController.handle)

export { routes }
