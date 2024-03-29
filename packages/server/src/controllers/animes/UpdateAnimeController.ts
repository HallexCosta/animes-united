import { Request, Response } from 'express'

import { UpdateAnimeService } from '@services/animes/UpdateAnimeService'

export class UpdateAnimeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body
    const { category } = request.params

    const updateAnimeService = new UpdateAnimeService()

    const anime = await updateAnimeService.execute({
      name,
      category
    })

    return response.json(anime)
  }
}
