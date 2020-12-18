import { ListAnimesCalendarUseCase } from './ListAnimesCalendarUseCase'

export class ListAnimesCalendarController {
  constructor(private listAnimesCalendarUseCase: ListAnimesCalendarUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const calendar = await this.listAnimesCalendarUseCase.execute()

      return response.status(200).json(calendar)
    } catch (e) {
      return response.status(400).json({
        message: e.message || 'Unexpected error'
      })
    }
  }
}
