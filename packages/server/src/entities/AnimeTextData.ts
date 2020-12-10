import { Streamings } from './Streamings'

export type AnimeTextData = {
  name: string
  imageURL: string
  genre: string
  status: string
  studio: string
  sinopse: string
  releaseData: number
  rating: number
  streamings: Streamings
}
