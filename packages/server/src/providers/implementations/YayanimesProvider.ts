import * as config from '@common/configs/puppeteer'
import { Anime, Episode } from '@entities/Anime'
import { PageErrors } from '@http/PageErrors'
import { IYayanimesProvider } from '@providers/IYayanimesProvider'
import puppeteer, { Browser, Page } from 'puppeteer'

abstract class Puppeteer {
  protected async initPage(): Promise<{ browser: Browser; page: Page }> {
    const browser = await puppeteer.launch(config.launch)
    const page = await browser.newPage()

    return { browser, page }
  }

  protected async closePages(browser: Browser): Promise<void> {
    for await (const page of await browser.pages()) {
      await page.close()
    }
  }
}

export class YayanimesProvider extends Puppeteer implements IYayanimesProvider {
  private static baseURL = 'https://yayanimes.net'
  public getBaseURL: () => string = () => YayanimesProvider.baseURL

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

    console.log('Fechando browser...')
    await this.closePages(browser)
    await browser.close()
    console.log('Browser fechado!')

    return names
  }

  public async getAnime(name: string): Promise<Anime | undefined> {
    const { browser, page } = await this.initPage()

    const uri = `${this.getBaseURL()}/${name.toLowerCase()}`

    await page.goto(uri, {
      timeout: 0,
      waitUntil: 'networkidle2'
    })

    const errors: PageErrors = {
      error: false
    }

    const anime = await page.evaluate(
      (baseURL: string, errors: PageErrors) => {
        const verifyIsInvalidAnime = () => {
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

            errors.error = true
          }

          // Episdodes found
          if (episodes.length <= 0) {
            console.log('Without Episodes: ', episodes.length)

            errors.error = true
          }

          return errors.error
        }

        const separateOvaOfEpisode = (allEpisodes: Element[]) => {
          const episodes: Episode[] = []
          const ovas: Episode[] = []

          allEpisodes.forEach(episodeOrOva => {
            const title = episodeOrOva.children[0].children[0].innerHTML.trim()
            const thumbnail = episodeOrOva.children[0].children[1].children[0]
              .attributes[0].nodeValue as string

            const qualityStreaming = episodeOrOva.children[0].children[1]
              .children[1].textContent as string

            const route = (episodeOrOva.children[1].children[0]
              .children[1] as HTMLAnchorElement).pathname

            if (title.match(/(ova)/gi)) {
              ovas.push({
                title,
                thumbnail,
                qualityStreaming,
                url: `${baseURL}${route}`
              })
            } else {
              episodes.push({
                title,
                thumbnail,
                qualityStreaming,
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
        const sinopse = document.querySelectorAll<HTMLDivElement>('.single div')
        const rating = document.querySelector<HTMLSpanElement>('#rmp-rating')
        const allEpisodes = [
          ...document.querySelectorAll('.contentBox ul li > div.box-episodio3')
        ]

        const streamings = separateOvaOfEpisode(allEpisodes)

        const anime: Anime = {
          name: title ? title.innerText.trim() : 'Without name',
          imageURL: image ? image.src.trim() : 'Without image',
          studio: about[1] ? about[1].innerText.trim() : 'Without studio',
          genre: about[3] ? about[3].innerText.trim() : 'Without genre',
          status: about[5] ? about[5].innerText.trim() : 'Without release data',
          yearRelease: about[7] ? Number(about[7].innerText.trim()) : 0,
          rating: rating ? Number(rating.innerText.trim()) : 0,
          sinopse: sinopse ? sinopse[13].innerText.trim() : 'Without sinopse',
          streamings: {
            episodes: streamings.episodes ? streamings.episodes.reverse() : [],
            ovas: streamings.ovas ? streamings.ovas.reverse() : []
          }
        }

        console.log(anime)

        return anime
      },
      this.getBaseURL(),
      errors
    )

    console.log('Fechando browser...')
    await this.closePages(browser)
    await browser.close()
    console.log('Browser fechado!')

    return anime
  }

  public async getRecommendationAnimes(): Promise<Anime[]> {
    const { browser, page } = await this.initPage()

    const uri = this.getBaseURL()

    await page.goto(uri, {
      timeout: 0,
      waitUntil: 'networkidle2'
    })

    const animes: Anime[] = await page.evaluate(() => {
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

      const animes: Anime[] = names.map((name: string, key: number) => {
        return {
          name,
          imageURL: images[key] || '',
          genre: '',
          status: '',
          studio: '',
          sinopse: '',
          yearRelease: 0,
          rating: 0,
          streamings: {
            episodes: [] as Episode[],
            ovas: [] as Episode[]
          }
        }
      })

      return animes
    })

    // console.log('Fechando browser...')
    // await this.closePages(browser)
    // await browser.close()
    // console.log('Browser fechado!')
    return animes
  }
}
