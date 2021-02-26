export type EpisodeResponse = {
  title: string
  number: number
  thumbnail: string
  qualityStreaming: string
  url: string
}

export type StreamingsResponse = {
  episodes: EpisodeResponse[]
  ovas: EpisodeResponse[]
}

export type AnimeResponse = {
  _id: string
  name: string
  imageURL: string
  genre: string
  status: string
  studio: string
  synopsis: string
  yearRelease: number
  rating: number
  streamings: StreamingsResponse
}
