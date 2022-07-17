import { StreamingsProps } from '@domains/streamings'

export type AnimeProps = {
  name: string,
  genre: string,
  image_url: string,
  rating: number,
  synopsis: string,
  status: string,
  streamings: StreamingsProps,
  studio: string,
  year_release: number
}

export default class Anime {
  public readonly props: AnimeProps
  public constructor(props: AnimeProps) {
    this.props = props
  }
}

