import { Request, Response } from 'express'

import { ListAnimesCalendarService } from '@services/animes/ListAnimesCalendarService'

export class ListAnimesCalendarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const service = new ListAnimesCalendarService()

    const animes = await service.execute()

    return response.json(animes)
  }
}
