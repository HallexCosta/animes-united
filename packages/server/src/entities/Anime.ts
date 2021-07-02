import { ObjectId } from 'mongodb'
import { Streamings } from './Streamings'

export class Anime {
  public readonly _id: ObjectId

  public readonly name: string
  public readonly imageURL: string
  public readonly genre: string
  public readonly status: string
  public readonly studio: string
  public readonly synopsis: string
  public readonly yearRelease: number
  public readonly rating: number

  public readonly streamings: Streamings

  public readonly createdAt: Date
  public readonly updatedAt: Date

  constructor(props: Omit<Anime, '_id'>, id?: ObjectId) {
    Object.assign(this, props)

    if (id) {
      this._id = id
    } else {
      this._id = new ObjectId()
    }

    Object.freeze(this)
  }
}
