export class Episode {
  public readonly title: string
  public readonly number: number
  public readonly thumbnail: string
  public readonly quality_streaming: string
  public readonly url: string

  constructor(props: Episode) {
    Object.assign(this, props)
    Object.freeze(this)
  }
}
