import { guid } from '@animes-united/hash-generator'

export class Episode {
  public readonly id: string

  public readonly title: string
  public readonly number: number
  public readonly thumbnail: string
  public readonly qualityStreaming: string
  public readonly url: string

  constructor(props: Omit<Episode, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = guid()
    }

    Object.freeze(this)
  }
}
