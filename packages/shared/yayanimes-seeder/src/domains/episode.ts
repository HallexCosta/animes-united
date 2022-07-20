export declare type EpisodeProps = {
  title: string
  number: number
  thumbnail: string
  quality_streamming: string
  url: string
}
export default class Episode {
  public props: EpisodeProps
  public constructor(props: EpisodeProps) {
    this.props = props
  }
}
