import { ListRecommendationAnimesUseCase } from './ListRecommendationAnimesUseCase'
import { Request, Response } from 'express'

export class ListRecommendationAnimesController {
  public constructor(
    private listRecommendationAnimesUseCase: ListRecommendationAnimesUseCase
  ) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const animes = await this.listRecommendationAnimesUseCase.execute()

      return response.status(200).json(animes)
    } catch (e) {
      console.error(e)
      return response.status(400).json({
        message: e.message || 'Unexpected error'
      })
    }
  }
}
