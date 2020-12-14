import { ListAnimeUseCase } from './ListAnimeUseCase'
import { Request, Response } from 'express'

export class ListAnimeController {
  public constructor(private listAnimeUseCase: ListAnimeUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.params
    console.log(name)
    try {
      const animeTextData = await this.listAnimeUseCase.execute({
        name
      })

      return response.status(200).json(animeTextData)
    } catch (e) {
      console.error(e)
      return response.status(400).json({
        message: e.message || 'Unexpected error'
      })
    }
  }
}
