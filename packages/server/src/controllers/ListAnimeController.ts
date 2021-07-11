import { Request, Response } from 'express'
import { ListAnimeService } from '@services'

export class ListAnimeController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { category, id } = request.params

    const service = new ListAnimeService()

    const anime = await service.execute({
      category,
      id
    })

    return response.json(anime)
  }
}
