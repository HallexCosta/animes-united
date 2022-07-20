import { AnimeProps } from '@domains/anime'

export declare type AnimeCategoryProps = {
  category: string
  animes: AnimeProps[]
}

export default class AnimeCategory {
  public readonly props: AnimeCategoryProps
  public constructor(props: AnimeCategoryProps) {
    this.props = props
  }
}
