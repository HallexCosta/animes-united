import Anime, { AnimeProps } from '@domains/anime'
import { AnimeCategoryProps } from '@domains/animeCategory'

import Utils from '@common/utils'

import { YayanimesProviderMethods } from './YayanimesProvider'

type AnimeHandlerProps = {
  yayanimes: YayanimesProviderMethods
}

interface AnimeHandlerMethods {
  /**
   * export animes categories data in json file
   * @param pathName: string path to save animes data
   * @param animesCategories: AnimeCategory[] content to save in json file
   * @return void
   */
  exportAnimesCategoriesInJSON(pathName: string, animesCategories: AnimeCategoryProps[]): Promise<void>
  /**
   * separate animes between in objects of animes categories
   * @param emptyAnimes: AnimeProps[] array of animes
   * @return AnimeCategoryProps[]
   */
  separateAnimesByCategory(emptyAnimes: AnimeProps[]): AnimeCategoryProps[]
  /**
   * Create empty animes object
   * @param animesNames: string[] array of anime names
   * @return AnimeProps[]
   */
  createEmptyAnimesObject(animesNames: string[]): AnimeProps[]
}

export default class AnimeHandler implements AnimeHandlerMethods {
  public constructor(public readonly props: AnimeHandlerProps) {}

  public async exportAnimesCategoriesInJSON(pathName: string, animesCategories: AnimeCategoryProps[]): Promise<void> {
    const animesCategoriesInJSON = JSON.stringify(animesCategories, null, 2)
    await Utils.createAndSaveFile(pathName, animesCategoriesInJSON)
    console.warn(`path exported: ${pathName}`)
    //console.log(animesCategories)
  }

  public createEmptyAnimesObject(animesNames: string[]): AnimeProps[] {
    return animesNames.map(name => ({
      name,
      genre: '',
      image_url: '',
      rating: 0,
      synopsis: '',
      status: '',
      streamings: {
        episodes: [],
        ovas: []
      },
      studio: '',
      year_release: 0
    }))
  }

  public separateAnimesByCategory(emptyAnimes: AnimeProps[]): AnimeCategoryProps[] {
    const animesCategories: AnimeCategoryProps[] = []

    for (const emptyAnime of emptyAnimes) {
      // check if anime name have name that not start with one letter
      const category: string | number = emptyAnime.name.match(/^[A-Z]/gi)
        ? emptyAnime.name[0].toUpperCase()
        : 1

      // find category using the anime name
      const categoryFound = animesCategories.find(
        animesCategory => animesCategory.category === category.toString()
      )

      const anime = new Anime(emptyAnime)
      if (categoryFound) {
        for (const animesCategory of animesCategories) {
          if (animesCategory.category === category) {
            animesCategory.animes.push(anime.props)
            break
          }
        }
      } else {
        animesCategories.push({
          category: category.toString(),
          animes: [
            anime.props
          ]
        })
      }
    }

    return animesCategories
  }
}
