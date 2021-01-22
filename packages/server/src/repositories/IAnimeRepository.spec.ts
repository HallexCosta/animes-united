/* eslint-disable @typescript-eslint/no-explicit-any */
import { Anime } from '@entities'
import { ObjectId } from 'mongodb'
import { IAnimeRepository } from './IAnimeRepository'
import { CategoryAnime } from './implementations/AnimeRepository'

const timeout = 1000 * 60 * 10

const mockAnimeRepository: jest.Mocked<IAnimeRepository> = {
  findAll: jest.fn(),
  category: jest.fn(),
  findByCategory: jest.fn(),
  findByName: jest.fn(),
  save: jest.fn(),
  deleteByName: jest.fn()
}

const anime = new Anime({
  _id: new ObjectId(),
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
      {
        title: 'Charlotte – Episódio 01',
        number: 1,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte01.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-1/'
      },
      {
        title: 'Charlotte – Episódio 02',
        number: 2,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte02.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-2/'
      },
      {
        title: 'Charlotte – Episódio 03',
        number: 3,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte03.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-3/'
      },
      {
        title: 'Charlotte – Episódio 04',
        number: 4,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte04.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-4/'
      },
      {
        title: 'Charlotte – Episódio 05',
        number: 5,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte05.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-5/'
      },
      {
        title: 'Charlotte – Episódio 06',
        number: 6,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte06.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-6/'
      },
      {
        title: 'Charlotte – Episódio 07',
        number: 7,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte07.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-7/'
      },
      {
        title: 'Charlotte – Episódio 08',
        number: 8,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte08.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-8/'
      },
      {
        title: 'Charlotte – Episódio 09',
        number: 9,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte09.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-9/'
      },
      {
        title: 'Charlotte – Episódio 10',
        number: 10,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte10.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-10/'
      },
      {
        title: 'Charlotte – Episódio 11',
        number: 11,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte11.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-11/'
      },
      {
        title: 'Charlotte – Episódio 12',
        number: 12,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte12.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-12/'
      },
      {
        title: 'Charlotte – Episódio 13',
        number: 13,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte13.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-13/'
      }
    ],
    ovas: [
      {
        title: 'Charlotte – OVA 01',
        number: 1,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/CharlotteOVA.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-ova-1/'
      }
    ]
  }
})

const categoriesAnimes: CategoryAnime[] = [
  {
    category: 'A',
    data: [
      {
        _id: new ObjectId(),
        name: 'Akami Ga Kill!',
        imageURL: 'http://yayanimes.net/Capa-AkamiGaKill.jpg',
        genre: '',
        rating: 5,
        sinopse: 'Something sinopse',
        status: 'Completo',
        yearRelease: 2015,
        studio: "P.A Studio's",
        streamings: {
          ovas: [],
          episodes: []
        }
      }
    ]
  },
  {
    category: 'C',
    data: [
      {
        ...anime,
        _id: new ObjectId()
      }
    ]
  }
]

mockAnimeRepository.findAll.mockResolvedValueOnce(categoriesAnimes)
mockAnimeRepository.category.mockReturnValueOnce(mockAnimeRepository)
mockAnimeRepository.findByCategory.mockResolvedValue(categoriesAnimes[0])
mockAnimeRepository.findByName.mockResolvedValue(anime)
mockAnimeRepository.save.mockResolvedValue(true)
mockAnimeRepository.deleteByName.mockResolvedValue(true)

describe('Test Anime Repository contract', () => {
  it(
    'Should be able to find all categories animes',
    async done => {
      const expected = await mockAnimeRepository.findAll()

      expect(mockAnimeRepository.findAll).toHaveBeenCalledTimes(1)
      expect(expected[0]).toHaveProperty('category')
      expect(expected[0]).toHaveProperty('data')
      expect(expected[0].data[0]).toHaveProperty('_id')
      expect(expected.length).toEqual(2)
      done()
    },
    timeout
  )

  it(
    'Should be able to category method return instance this class',
    () => {
      const expected = mockAnimeRepository.category('')

      expect(expected).toEqual(mockAnimeRepository)
    },
    timeout
  )

  it(
    'Should be able to throw error if not find anime by category (Yayanimes.findByCategory)',
    async done => {
      mockAnimeRepository.findByCategory.mockRejectedValueOnce(
        new Error('Collection name not defined')
      )

      let error
      try {
        await mockAnimeRepository.findByCategory({} as any)
      } catch (e) {
        error = e
      }

      expect(error.name).toBe('Error')
      expect(error.message).toBe('Collection name not defined')

      done()
    },
    timeout
  )

  it(
    'Should be able to find anime by category (Yayanimes.findByCategory)',
    async done => {
      const expected = await mockAnimeRepository.findByCategory('C')

      expect(mockAnimeRepository.findByCategory).toHaveBeenCalledTimes(2)
      expect(mockAnimeRepository.findByCategory).toHaveBeenCalledWith('C')
      expect(expected).toHaveProperty('category')
      expect(expected).toHaveProperty('data')

      done()
    },
    timeout
  )

  it(
    'Should be able to find anime by name (Yayanimes.findByName)',
    async done => {
      const expected = await mockAnimeRepository.findByName('Charlotte')

      expect(mockAnimeRepository.findByName).toHaveBeenCalledTimes(1)
      expect(mockAnimeRepository.findByName).toHaveBeenCalledWith('Charlotte')
      expect(expected).toHaveProperty('_id')
      expect(expected).toEqual(anime)

      done()
    },
    timeout
  )

  it(
    'Should be able to throw error if not save anime (Yayanimes.save)',
    async done => {
      mockAnimeRepository.save.mockRejectedValueOnce(
        new Error('Failed to save anime')
      )

      let error

      try {
        await mockAnimeRepository.save(anime)
      } catch (e) {
        error = e
      }

      expect(error.name).toBe('Error')
      expect(error.message).toBe('Failed to save anime')

      done()
    },
    timeout
  )

  it(
    'Should be able to save anime (Yayanimes.save)',
    async done => {
      const expected = await mockAnimeRepository.save(anime)

      expect(mockAnimeRepository.save).toBeCalledTimes(2)
      expect(mockAnimeRepository.save).toBeCalledWith(anime)
      expect(expected).toBeTruthy()

      done()
    },
    timeout
  )

  it(
    'Should be able to throw error if not delete anime by name (Yayanimes.deleteByName)',
    async done => {
      mockAnimeRepository.deleteByName.mockRejectedValueOnce(
        new Error(`Failed to delete anime by name ${anime.name}`)
      )

      let error

      try {
        await mockAnimeRepository.deleteByName(anime.name)
      } catch (e) {
        error = e
      }

      expect(mockAnimeRepository.deleteByName).toHaveBeenCalledTimes(1)
      expect(error.name).toBe('Error')
      expect(error.message).toBe(`Failed to delete anime by name ${anime.name}`)

      done()
    },
    timeout
  )

  it(
    'Should be able to delete anime by name (Yayanimes.deleteByName)',
    async done => {
      const expected = await mockAnimeRepository.deleteByName('Charlotte')

      expect(mockAnimeRepository.deleteByName).toHaveBeenCalledTimes(2)
      expect(mockAnimeRepository.deleteByName).toHaveBeenCalledWith('Charlotte')
      expect(expected).toBeTruthy()

      done()
    },
    timeout
  )
})
