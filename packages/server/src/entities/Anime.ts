import { ObjectId } from 'mongodb'
import { Episode } from './Episode'
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

  constructor(props: Omit<Anime, '_id'>, _id?: ObjectId) {
    Object.assign(this, props)

    if (!_id) {
      this._id = new ObjectId()
    }

    Object.freeze(this)
  }
}
