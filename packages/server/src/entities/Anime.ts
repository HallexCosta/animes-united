import { guid } from '@animes-united/hash-generator'
import { Episode } from '.'
import { Streamings } from './Streamings'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export class Anime {
  public readonly _id: string

  public readonly name: string
  public readonly image_url: string
  public readonly genre: string
  public readonly status: string
  public readonly studio: string
  public readonly synopsis: string
  public readonly year_release: number
  public readonly rating: number

  public readonly streamings: Streamings

  public readonly created_at: Date
  public readonly updated_at: Date

  constructor(props: PartialBy<Anime, '_id'>) {
    Object.assign(this, {
      ...props,
      streamings: new Streamings({
        episodes: props.streamings.episodes.map(
          episode => new Episode(episode)
        ),
        ovas: props.streamings.ovas.map(ova => new Episode(ova))
      })
    })

    if (!props._id) {
      this._id = guid()
    }

    Object.freeze(this)
  }
}
