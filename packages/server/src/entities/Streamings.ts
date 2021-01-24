import { Episode } from './Episode'

export class Streamings {
  public readonly episodes: Episode[]
  public readonly ovas: Episode[]

  constructor(
    props: Streamings = {
      episodes: [] as Episode[],
      ovas: [] as Episode[]
    }
  ) {
    Object.assign(this, props)
    Object.freeze(this)
  }
}
