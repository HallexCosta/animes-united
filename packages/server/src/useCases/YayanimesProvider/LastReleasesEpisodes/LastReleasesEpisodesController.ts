import { Request, Response } from 'express'
import { LastReleasesEpisodesUseCase } from './LastReleasesEpisodesUseCase'

export class LastReleasesEpisodesController {
  public constructor(
    private lastReleasesEpisodesUseCase: LastReleasesEpisodesUseCase
  ) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const lastReleasesEpisodes = await this.lastReleasesEpisodesUseCase.execute()

      return response.status(200).json(lastReleasesEpisodes)
    } catch (e) {
      return response.status(400).json({
        message: e || 'Unexpected error'
      })
    }
  }
}
