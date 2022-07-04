import { Request, Response } from 'express'

import { ListAnimesService } from '@services/animes/ListAnimesService'

export class ListAnimesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const service = new ListAnimesService()

    const animes = await service.execute()

    return response.json(animes)
  }
}
