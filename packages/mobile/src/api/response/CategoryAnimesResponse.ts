import { AnimeResponse } from './AnimeResponse'

export class CategoryAnimesResponse {
  public readonly category: string
  public readonly data: AnimeResponse[]

  public constructor(props: CategoryAnimesResponse) {
    Object.assign(this, props)
    Object.freeze(this)
  }
}
