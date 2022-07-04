import { Router } from 'express'

import { ListAnimeController } from '@controllers/animes/ListAnimeController'
import { ListAnimeCategoryController } from '@controllers/animes/ListAnimeCategoryController'
import { ListAnimesCalendarController } from '@controllers/animes/ListAnimesCalendarController'
import { ListAnimesController } from '@controllers/animes/ListAnimesController'
import { ListAnimeRecommendationController } from '@controllers/animes/ListAnimeRecommendationController'
import { ListLatestEpisodesReleaseController } from '@controllers/animes/ListLatestEpisodesReleaseController'
import { UpdateAnimeController } from '@controllers/animes/UpdateAnimeController'

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

export default routes 
