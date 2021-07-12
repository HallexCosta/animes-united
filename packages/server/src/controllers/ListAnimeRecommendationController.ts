import { Request, Response } from 'express'

import { ListAnimeRecommendationService } from '@services'

export class ListAnimeRecommendationController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const service = new ListAnimeRecommendationService()

    const animes = await service.execute()

    return response.json(animes)
  }
}
