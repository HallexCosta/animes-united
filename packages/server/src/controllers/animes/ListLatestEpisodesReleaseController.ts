import { Request, Response } from 'express'

import { ListLatestEpisodesReleaseService } from '@services/animes/ListLatestEpisodesReleaseService'

export class ListLatestEpisodesReleaseController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const service = new ListLatestEpisodesReleaseService()

    const episodes = await service.execute()

    return response.json(episodes)
  }
}
