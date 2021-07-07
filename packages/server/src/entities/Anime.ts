import { guid } from '@animes-united/hash-generator'
import { Episode } from '.'
import { Streamings } from './Streamings'

export class Anime {
  public readonly _id?: string

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

  constructor(props: Anime) {
    Object.assign(this, {
      ...props,
      streamings: new Streamings({
        episodes: props.streamings.episodes.map(
          episode => new Episode(episode)
        ),
        ovas: props.streamings.ovas.map(ova => new Episode(ova))
      })
    })

    if (!this._id) {
      this._id = guid()
    }

    Object.freeze(this)
  }
}
