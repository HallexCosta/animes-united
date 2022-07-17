import { EpisodeProps } from '@domains/episode'

export declare type StreamingsProps = {
  episodes: EpisodeProps[]
  ovas: EpisodeProps[]
}
export default class Streamings {
  public props: StreamingsProps
  public constructor(props: StreamingsProps) {
    this.props = props
  }
}

