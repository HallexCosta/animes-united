export type Episode = {
  title: string
  thumbnail: string
  qualityStreaming: string
  url: string
}

export type Streamings = {
  episodes: Episode[]
  ovas: Episode[]
}

export type Anime = {
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
