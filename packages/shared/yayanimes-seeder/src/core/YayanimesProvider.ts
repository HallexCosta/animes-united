import Puppeteer from './Puppeteer'

import Anime, { AnimeProps } from '@domains/anime'
import Episode, { EpisodeProps } from '@domains/episode'

type Override<TypeSource, OverrideProperties> = Pick<
  TypeSource,
  Exclude<keyof TypeSource, keyof OverrideProperties>
> & OverrideProperties

export type AnimeCalendar = {
  title: string
  thumbnail: string
}

type StreamingsWithoutId = {
  episodes: Omit<EpisodeProps, 'id'>[]
  ovas: Omit<EpisodeProps, 'id'>[]
}

type AnimeWithoutId = Override<
  Omit<AnimeProps, '_id'>,
  { streamings: StreamingsWithoutId }
>

export interface YayanimesProviderMethods {
  getBaseURL(): string
  getAnimeNames(): Promise<string[]>
  /**
   * get anime details using anime name
   * @param name: string anime name to get details
   * @returns Anime
   */
  getAnime(name: string): Promise<Omit<AnimeProps, '_id'> | undefined>
  getRecommendationAnimes(): Promise<Omit<AnimeProps, '_id'>[]>
  getLastReleasesEpisodes(): Promise<Omit<EpisodeProps, 'id'>[]>
  getAnimesCalendar(): Promise<AnimeCalendar[]>
}

export default class YayanimesProvider extends Puppeteer implements YayanimesProviderMethods {
  private static baseURL = 'https://yayanimes.net'
  public getBaseURL: () => string = () => YayanimesProvider.baseURL

  public constructor() {
    super()
  }

  public async getAnimeNames(): Promise<string[]> {
    const { browser, page } = await this.initPage()

    const uri = `${this.getBaseURL()}/lista-de-animes`

    await page.goto(uri, {
      timeout: 0,
      waitUntil: 'networkidle2'
    })

    const names = await page.evaluate(() => {
      const anchors: HTMLAnchorElement[] = [
        ...document.querySelectorAll<HTMLAnchorElement>('.aba ul > li > a')
      ]

      return anchors.map(anchor => String(anchor.textContent))
    })

    await this.closeBrowser(browser)

    return names
  }

  public async getAnime(name: string): Promise<Omit<AnimeProps, '_id'> | undefined> {
    const normalize = (name: string) => {
      return name.split(' ').join('-').toLowerCase()
    }

    const { browser, page } = await this.initPage()

    const uri = `${this.getBaseURL()}/${normalize(name)}`

    await page.goto(uri, {
      timeout: 0,
      waitUntil: 'networkidle2'
    })

    const anime: AnimeWithoutId | undefined = await page.evaluate(
      (baseURL: string) => {
        const verifyIsInvalidAnime = () => {
          let error = false

          const pageNotFound = document.querySelector<HTMLHeadingElement>('h3')
            ?.innerText

          const episodes = [
            ...document.querySelectorAll(
              '.contentBox ul li > div.box-episodio3'
            )
          ]

          // Page not found
          if (pageNotFound === 'PAGINA NÃO ENCONTRADA') {
            console.log(`Error Message: ${pageNotFound}`)

            error = true
          }

          // Episodes found
          if (episodes.length <= 0) {
            console.log('Without Episodes: ', episodes.length)

            error = true
          }

          return error
        }

        const separateOvaOfEpisode = (allEpisodes: Element[]) => {
          const episodes: Omit<EpisodeProps, 'id'>[] = []
          const ovas: Omit<EpisodeProps, 'id'>[] = []

          allEpisodes.forEach(episodeOrOva => {
            const title = (episodeOrOva.children[0]
              .children[0] as HTMLAnchorElement).innerText.trim()

            const number = Number(
              (episodeOrOva.children[0].children[1]
                .children[2] as HTMLSpanElement).innerText
                .split(' ')[1]
                .trim()
            )

            const thumbnail = (episodeOrOva.children[0].children[1]
              .children[0] as HTMLImageElement).src

            const quality_streamming = (episodeOrOva.children[0].children[1]
              .children[1] as HTMLSpanElement).innerText.trim()

            const route = (episodeOrOva.children[1].children[0]
              .children[1] as HTMLAnchorElement).pathname

            if (title.match(/(ova)/gi)) {
              ovas.push({
                title,
                number,
                thumbnail,
                quality_streamming,
                url: `${baseURL}${route}`
              })
            } else {
              episodes.push({
                title,
                number,
                thumbnail,
                quality_streamming,
                url: `${baseURL}${route}`
              })
            }
          })

          return { episodes, ovas }
        }

        if (verifyIsInvalidAnime()) {
          return
        }

        const title = document.querySelector<HTMLSpanElement>(
          'span.color-change'
        )
        const image = document.querySelector<HTMLImageElement>(
          '#capaAnime > img'
        )
        const about = document.querySelectorAll<HTMLTableRowElement>(
          'table > tbody > tr > td'
        )
        const synopsis = document.querySelectorAll<HTMLDivElement>(
          '.single div'
        )
        const rating = document.querySelector<HTMLSpanElement>('#rmp-rating')

        const allEpisodes = [...document.querySelectorAll('div.box-episodio3')]

        const streamings = separateOvaOfEpisode(allEpisodes)

        const anime = {
          name: title ? title.innerText.trim() : 'Without name',
          imageURL: image ? image.src.trim() : 'Without image',
          studio: about[1] ? about[1].innerText.trim() : 'Without studio',
          genre: about[3] ? about[3].innerText.trim() : 'Without genre',
          status: about[5] ? about[5].innerText.trim() : 'Without release data',
          yearRelease: about[7] ? Number(about[7].innerText.trim()) : 0,
          rating: rating ? Number(rating.innerText.trim()) : 0,
          synopsis: synopsis
            ? synopsis[13].innerText.trim()
            : 'Without sinopse',
          streamings: {
            episodes: streamings.episodes
              ? streamings.episodes.reverse()
              : ([] as EpisodeProps[]),
            ovas: streamings.ovas
              ? streamings.ovas.reverse()
              : ([] as EpisodeProps[])
          }
        }

        console.log(anime)

        return anime
      },
      this.getBaseURL()
    )

    await this.closePages(browser)
    await browser.close()

    if (!anime) {
      return undefined
    }

    const streamings = {
      episodes: anime.streamings.episodes.map(episode => new Episode(episode).props),
      ovas: anime.streamings.ovas.map(ova => new Episode(ova).props)
    }

    return new Anime({
      ...anime,
      streamings
    }).props
  }

  public async getRecommendationAnimes(): Promise<AnimeProps[]> {
    const { browser, page } = await this.initPage()

    const uri = this.getBaseURL()

    await page.goto(uri, {
      timeout: 0,
      waitUntil: 'networkidle2'
    })

    const evaluateAnimes: Omit<AnimeProps, '_id'>[] = await page.evaluate(() => {
      const imagesElements = [
        ...document.querySelectorAll<HTMLImageElement>(
          '.carousel-slider__item > a > img'
        )
      ]
      const namesElements = [
        ...document.querySelectorAll<HTMLImageElement>(
          '.carousel-slider__item > a > div > h4'
        )
      ]

      const images = imagesElements.map(imageElement => {
        return imageElement.attributes[0].textContent
      })

      const names = namesElements.map(nameElement => {
        return nameElement.innerText
      })

      console.log('Final images', images)
      console.log('Final names', names)

      const animes: Omit<AnimeProps, '_id'>[] = names.map(
        (name: string, key: number) => {
          return {
            name,
            imageURL: images[key] ?? 'Unknown',
            genre: 'Unknown',
            status: 'Unknown',
            studio: 'Unknown',
            synopsis: 'Unknown',
            yearRelease: 0,
            rating: 0,
            streamings: {
              episodes: [] as EpisodeProps[],
              ovas: [] as EpisodeProps[]
            }
          }
        }
      )

      return animes
    })

    const animes = evaluateAnimes.map(evaluateAnime => new Anime(evaluateAnime).props)

    await this.closeBrowser(browser)

    return animes
  }

  public async getLastReleasesEpisodes(): Promise<EpisodeProps[]> {
    const { browser, page } = await this.initPage()
    const uri = this.getBaseURL()

    await page.goto(uri, {
      timeout: 0,
      waitUntil: 'networkidle2'
    })

    const evaluateEpisodes = await page.evaluate(() => {
      const treatmentData = (
        titleElements: HTMLAnchorElement[],
        imageElements: HTMLImageElement[],
        qualityStreamingElements: HTMLSpanElement[],
        numberElements: HTMLSpanElement[],
        urlElements: HTMLAnchorElement[]
      ) => {
        const titles = titleElements.map(titleElement => titleElement.innerText)
        const images = imageElements.map(imageElement => imageElement.src)
        const qualityStreamings = qualityStreamingElements.map(
          qualityStreaming => qualityStreaming.innerText
        )
        const numbers = numberElements.map(episode => Number(episode.innerText))
        const urls = urlElements.map(url => url.href)

        return {
          titles,
          images,
          qualityStreamings,
          numbers,
          urls
        }
      }

      const titleElements = [
        ...document.querySelectorAll<HTMLAnchorElement>(
          'div.box-episodio > div.nome-thumb > a'
        )
      ]
      const imageElements = [
        ...document.querySelectorAll<HTMLImageElement>(
          'div.box-episodio3 > div.nome-thumb > a.thumb > img'
        )
      ]
      const qualityStreamingElements = [
        ...document.querySelectorAll<HTMLSpanElement>(
          'div.box-episodio3  > div.nome-thumb > a.thumb > span.num-episodio3'
        )
      ]
      const numberElements = [
        ...document.querySelectorAll<HTMLSpanElement>(
          'div.box-episodio3 > div.nome-thumb > a.thumb > span.num-episodio'
        )
      ]
      const urlElements = [
        ...document.querySelectorAll<HTMLAnchorElement>('a.btn-online')
      ]

      const {
        titles,
        images,
        qualityStreamings,
        numbers,
        urls
      } = treatmentData(
        titleElements,
        imageElements,
        qualityStreamingElements,
        numberElements,
        urlElements
      )

      const episodes: Omit<EpisodeProps, 'id'>[] = titles.map((title, index) => {
        const thumbnail = images[index]
        const quality_streamming = qualityStreamings[index]
        const number = numbers[index]
        const url = urls[index]

        return {
          title,
          thumbnail,
          quality_streamming,
          number,
          url
        }
      })

      return episodes
    })

    const episodes = evaluateEpisodes.map(
      evaluateEpisode => new Episode(evaluateEpisode).props
    )

    await this.closeBrowser(browser)

    return episodes
  }

  public async getAnimesCalendar(): Promise<AnimeCalendar[]> {
    const { browser, page } = await this.initPage()

    const uri = `${this.getBaseURL()}/calendario`

    await page.goto(uri, {
      timeout: 0,
      waitUntil: 'networkidle2'
    })

    const animesCalendar = await page.evaluate(() => {
      const treatmentData = (
        titleElements: HTMLDivElement[],
        imageElements: HTMLDivElement[]
      ) => {
        const titles = titleElements.map(titleElement => titleElement.innerText)
        const images = imageElements.map(imageElement =>
          imageElement.style.backgroundImage.slice(5, -2)
        )

        return {
          titles,
          images
        }
      }
      const titleElements = [
        ...document.querySelectorAll<HTMLDivElement>(
          'div.maisBaixadosImagem > div.maisBaixadosNome'
        )
      ]
      const imageElements = [
        ...document.querySelectorAll<HTMLDivElement>('div.maisBaixadosImagem')
      ]

      const { titles, images } = treatmentData(titleElements, imageElements)

      const animesCalendar: AnimeCalendar[] = titles.map((title, index) => ({
        title,
        thumbnail: images[index]
      }))

      return animesCalendar
    })

    await this.closeBrowser(browser)

    return animesCalendar
  }
}
