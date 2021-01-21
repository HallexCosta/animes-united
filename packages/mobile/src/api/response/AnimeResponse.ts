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

export type AnimeResponse = {
  _id: ObjectId
  name: string
  imageURL: string
  genre: string
  status: string
  studio: string
  synopsis: string
  yearRelease: number
  rating: number
  streamings: Streamings
}
