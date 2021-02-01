import { ListAnimeUseCase } from './ListAnimeUseCase'
import { Request, Response } from 'express'

export class ListAnimeController {
  public constructor(private listAnimeUseCase: ListAnimeUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { category, name } = request.params

    try {
      const anime = await this.listAnimeUseCase.execute({
        category,
        name
      })

      return response.status(200).json(anime)
    } catch (e) {
      return response.status(400).json({
        message: e.message || 'Unexpected error'
      })
    }
  }
}
