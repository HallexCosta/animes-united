import { Request, Response } from 'express'

import { ListAnimeCategoryService } from '@services/animes/ListAnimeCategoryService'

export class ListAnimeCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category } = request.params

    const service = new ListAnimeCategoryService()

    const animes = await service.execute({ category })

    return response.json(animes)
  }
}
