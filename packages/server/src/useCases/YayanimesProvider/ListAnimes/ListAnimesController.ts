import { ListAnimesUseCase } from './ListAnimesUseCase'
import { Request, Response } from 'express'

export class ListAnimesController {
  public constructor(private listAnimesUseCase: ListAnimesUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const names = await this.listAnimesUseCase.execute()

      return response.status(200).json(names)
    } catch (e) {
      console.error(e)
      return response.status(400).json({
        message: e.message || 'Unexpected error'
      })
    }
  }
}
