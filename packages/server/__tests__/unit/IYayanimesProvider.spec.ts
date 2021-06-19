import { IYayanimesProvider } from '@providers/IYayanimesProvider'
import { AnimeCalendar } from '@providers/implementations/YayanimesProvider'
import { Anime, Episode } from '@entities'

const timeout = 1000 * 60 * 10

const mockYayanimesProvider: jest.Mocked<IYayanimesProvider> = {
  getAnimeNames: jest.fn(), // OK
  getBaseURL: jest.fn(), // OK
  getAnimesCalendar: jest.fn(), // OK
  getLastReleasesEpisodes: jest.fn(), // OK
  getAnime: jest.fn(), // OK
  getRecommendationAnimes: jest.fn() // OK
}

mockYayanimesProvider.getAnimeNames.mockResolvedValueOnce([
  'Darling in the franxx',
  'Charlotte',
  'Boku no Hero'
])

mockYayanimesProvider.getBaseURL.mockReturnValueOnce('https://yayanimes.net')

mockYayanimesProvider.getAnimesCalendar.mockResolvedValueOnce([
  {
    title: 'Munou na Nana',
    thumbnail: 'https://yayanimes.net/Calendario/MunounaNana.jpg'
  }
])

const episode: Omit<Episode, 'id'> = {
  title: 'Dogeza de Tanondemita – Episódio 11',
  number: 11,
  qualityStreaming: 'HD',
  thumbnail: 'https://yayanimes.net/Miniaturas/2020/Dogeza/Dogeza11.jpg',
  url: 'https://yayanimes.net/dogeza-de-tanondemita-episodio-11/'
}

mockYayanimesProvider.getLastReleasesEpisodes.mockResolvedValueOnce([episode])

const anime: Omit<Anime, '_id'> = {
  name: 'Charlotte',
  imageURL: 'https://yayanimes.net/CapasAnimes/C/Charlotte.jpg',
  studio: 'P.A Works',
  genre: 'Drama, Escolar, Superpoderes',
  status: 'Completo',
  yearRelease: 2015,
  rating: 9.4,
  synopsis:
    'A história gira em torno de habilidades especiais que ocorrem entre um pequeno percentual de meninos e meninas na puberdade. Yuu Otosaka usa seu poder sem os outros saberem, e vive uma vida escolar bastante normal. Perante ele, de repente, aparece uma menina, Nao Tomori. Devido ao seu encontro com ela, o destino dos usuários de poderes especiais será exposto.',
  streamings: {
    episodes: [
      new Episode({
        title: 'Charlotte – Episódio 01',
        number: 1,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte01.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-1/'
      })
    ],
    ovas: [
      new Episode({
        title: 'Charlotte – OVA 01',
        number: 1,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/CharlotteOVA.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-ova-1/'
      })
    ]
  }
}
mockYayanimesProvider.getAnime.mockResolvedValueOnce(anime)
mockYayanimesProvider.getRecommendationAnimes.mockResolvedValueOnce([anime])

describe('Test YayanimesProvider contract', () => {
  it(
    'Should be able to return array with all anime names (YayanimesProvider.getAnimeNames)',
    async done => {
      const expected = await mockYayanimesProvider.getAnimeNames()
      expect(mockYayanimesProvider.getAnimeNames).toHaveBeenCalledTimes(1)
      expect(expected).toEqual([
        'Darling in the franxx',
        'Charlotte',
        'Boku no Hero'
      ])
      done()
    },
    timeout
  )

  it(
    'Should be able to return base URL of yayanimes.net (YayanimesProvider.getBaseURL)',
    () => {
      const url = mockYayanimesProvider.getBaseURL()

      expect(mockYayanimesProvider.getBaseURL).toHaveBeenCalledTimes(1)
      expect(url).toBe('https://yayanimes.net')
    },
    timeout
  )

  it(
    'Should be able to return calendar of animes from yayanimes.net (Yayanimes.getAnimesCalendar)',
    async done => {
      const expected = await mockYayanimesProvider.getAnimesCalendar()

      expect(mockYayanimesProvider.getAnimesCalendar).toHaveBeenCalledTimes(1)
      expect(expected).toEqual<AnimeCalendar[]>([
        {
          title: 'Munou na Nana',
          thumbnail: 'https://yayanimes.net/Calendario/MunounaNana.jpg'
        }
      ])
      done()
    },
    timeout
  )

  it(
    'Should be able to return release last episodes of yayanimes.net (YayanimesProvider.getLastReleasesEpisodes)',
    async done => {
      const expected = await mockYayanimesProvider.getLastReleasesEpisodes()

      expect(
        mockYayanimesProvider.getLastReleasesEpisodes
      ).toHaveBeenCalledTimes(1)
      expect(expected).toEqual([
        {
          title: 'Dogeza de Tanondemita – Episódio 11',
          number: 11,
          qualityStreaming: 'HD',
          thumbnail:
            'https://yayanimes.net/Miniaturas/2020/Dogeza/Dogeza11.jpg',
          url: 'https://yayanimes.net/dogeza-de-tanondemita-episodio-11/'
        }
      ])
      done()
    },
    timeout
  )

  it(
    'Should be able to return anime detail of yayanimes.net (YayanimesProvider.getAnime)',
    async done => {
      const expected = await mockYayanimesProvider.getAnime('charlotte')

      expect(mockYayanimesProvider.getAnime).toHaveBeenCalledTimes(1)
      expect(expected).toEqual(anime)
      done()
    },
    timeout
  )

  it(
    'Should be able to return animes recommendation of yayanimes.net (YayanimesProvider.getRecommendationAnimes)',
    async done => {
      const expected = await mockYayanimesProvider.getRecommendationAnimes()

      expect(mockYayanimesProvider.getAnime).toHaveBeenCalledTimes(1)
      expect(expected).toEqual([anime])
      done()
    },
    timeout
  )
})
