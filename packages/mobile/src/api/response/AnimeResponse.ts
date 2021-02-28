import { guid } from '@animes-united/hash-generator'

export class EpisodeResponse {
  public readonly id: string

  public readonly title: string
  public readonly number: number
  public readonly thumbnail: string
  public readonly qualityStreaming: string
  public readonly url: string

  public constructor(props: Omit<EpisodeResponse, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = guid()
    }

    Object.freeze(props)
  }
}

export class StreamingsResponse {
  public readonly episodes: EpisodeResponse[]
  public readonly ovas: EpisodeResponse[]

  public constructor(props: StreamingsResponse) {
    Object.assign(this, props)
    Object.freeze(this)
  }
}

export class AnimeResponse {
  public readonly _id: string
  public readonly name: string
  public readonly imageURL: string
  public readonly genre: string
  public readonly status: string
  public readonly studio: string
  public readonly synopsis: string
  public readonly yearRelease: number
  public readonly rating: number
  public readonly streamings: StreamingsResponse

  public constructor(props: Omit<AnimeResponse, '_id'>, id?: string) {
    Object.assign(props, this)

    if (!id) {
      this._id = guid()
    }

    Object.freeze(this)
  }
}
