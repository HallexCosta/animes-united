import { ObjectId } from 'mongodb'

export type Episode = {
  title: string
  number: number
  thumbnail: string
  qualityStreaming: string
  url: string
}

export type Streamings = {
  episodes: Episode[]
  ovas: Episode[]
}

// export type Anime = {
//   name: string
//   imageURL: string
//   genre: string
//   status: string
//   studio: string
//   synopsis: string
//   yearRelease: number
//   rating: number
//   streamings: Streamings
// }

export class Anime {
  public readonly id?: ObjectId

  public readonly name: string
  public readonly imageURL: string
  public readonly genre: string
  public readonly status: string
  public readonly studio: string
  public readonly synopsis: string
  public readonly yearRelease: number
  public readonly rating: number

  public readonly streamings: Streamings

  constructor(props: Omit<Anime, 'id'>, id?: ObjectId) {
    Object.assign(this, props)

    if (!id) {
      this.id = new ObjectId()
    }
  }
}
