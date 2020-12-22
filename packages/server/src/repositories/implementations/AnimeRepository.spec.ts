import { mongodbURITest } from '@common/configs/mongodb'
import { Anime } from '@entities/Anime'
import { AnimeRepository } from './AnimeRepository'

// jest.mock('./AnimeRepository')

describe('Test Anime Repository', () => {
  const category = 'C'
  const anime: Anime = {
    name: 'Charlotte',
    imageURL: 'https://yayanimes.net/CapasAnimes/C/Charlotte.jpg',
    studio: 'P.A Works',
    genre: 'Drama, Escolar, Superpoderes',
    status: 'Completo',
    yearRelease: 2015,
    rating: 9.6,
    sinopse:
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
  }

  it('Should be able to generate a new instance of class AnimeRepository', () => {
    const animeRepository = new AnimeRepository(mongodbURITest)

    expect(animeRepository).toBeInstanceOf(AnimeRepository)
  })

  it('Should be able return IAnimeRepository contract in method AnimeRepository.category', () => {
    const animeRepository = new AnimeRepository(mongodbURITest)
    const expected = animeRepository.category(category)

    expect(expected).toBeInstanceOf(AnimeRepository)
  })

  it('Should be able to save an anime with successfully', async () => {
    const animeRepository = new AnimeRepository(mongodbURITest)
    const expected = await animeRepository.category(category).save(anime)

    expect(expected).toEqual(true)
  })

  it('Should be able to throw error if findByCategory method does not have a parameter', async () => {
    const animeRepository = new AnimeRepository(mongodbURITest)
    try {
      await animeRepository.findByCategory()
    } catch (e) {
      expect(e.name).toBe('Error')
      expect(e.message).toBe('Collection name not defined')
    }
  })

  it('Should be able to find animes by category', async () => {
    const animeRepository = new AnimeRepository(mongodbURITest)
    const expected = await animeRepository.findByCategory(category)

    expect(expected).not.toBeUndefined()
    expect(expected).toHaveProperty('data')
    expect(expected).toHaveProperty('category')
    expect(expected.data[0]).toHaveProperty('_id')
  })

  it('Should be able to find all categories animes', async () => {
    const animeRepository = new AnimeRepository(mongodbURITest)
    const expected = await animeRepository.findAll()

    expect(expected).not.toBeUndefined()
    expect(expected[0]).toHaveProperty('data')
    expect(expected[0]).toHaveProperty('category')
  })

  it('Should be able to throw error if the collectionName is not defined when executing the method deleteByName', async () => {
    const animeRepository = new AnimeRepository(mongodbURITest)
    let error
    try {
      await animeRepository.deleteByName('Charlotte')
    } catch (e) {
      error = e
    }
    expect(error.name).toBe('Error')
    expect(error.message).toBe('Collection name not defined')
  })

  it('Should be able to delete anime by name', async () => {
    const animeRepository = new AnimeRepository(mongodbURITest)
    const expected = await animeRepository
      .category(category)
      .deleteByName('Charlotte')

    expect(expected).toEqual(true)
  })
})
