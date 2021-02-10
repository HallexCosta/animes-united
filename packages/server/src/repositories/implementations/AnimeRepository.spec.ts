/* eslint-disable @typescript-eslint/no-explicit-any */
import { mongodbURITest } from '@common/configs/mongodb'
import { Episode } from '@entities'
import { Anime } from '@entities/Anime'
import { ObjectId } from 'mongodb'
import { AnimeRepository } from './AnimeRepository'

// jest.mock('./AnimeRepository')

const timeout = 1000 * 60 * 10

const category = 'C'
const anime = new Anime({
  name: 'Charlotte',
  imageURL: 'https://yayanimes.net/CapasAnimes/C/Charlotte.jpg',
  studio: 'P.A Works',
  genre: 'Drama, Escolar, Superpoderes',
  status: 'Completo',
  yearRelease: 2015,
  rating: 9.6,
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
})

describe('Test Anime Repository', () => {
  it(
    'Should be able to generate a new instance of class AnimeRepository',
    () => {
      const animeRepository = new AnimeRepository(mongodbURITest)

      expect(animeRepository).toBeInstanceOf(AnimeRepository)
    },
    timeout
  )

  it(
    'Should be able return IAnimeRepository contract in method AnimeRepository.category',
    () => {
      const animeRepository = new AnimeRepository(mongodbURITest)
      const expected = animeRepository.category(category)

      expect(expected).toBeInstanceOf(AnimeRepository)
    },
    timeout
  )

  it(
    'Should be able to save an anime with successfully',
    async done => {
      const animeRepository = new AnimeRepository(mongodbURITest)
      const expected = await animeRepository.category(category).save(anime)

      expect(expected).toBeTruthy()
      done()
    },
    timeout
  )

  it(
    'Should be able to throw error if not update anime by id (AnimeRepository.updateById)',
    async done => {
      const animeRepository = new AnimeRepository(mongodbURITest)

      let error

      try {
        await animeRepository
          .category(category)
          .updateById(anime, new ObjectId('abcabcabcabcabcabcabcabc'))
      } catch (e) {
        error = e
      }

      expect(error.name).toBe('Error')
      expect(error.message).toBe('Failed to update anime by id')
      done()
    },
    timeout
  )

  it(
    'Should be able to updateById an anime with successfully (AnimeRepository.updateById)',
    async done => {
      const animeRepository = new AnimeRepository(mongodbURITest)

      const expected = await animeRepository.category(category).updateById(
        {
          ...anime,
          name: 'Charlotte Atualizado'
        },
        anime._id
      )

      expect(expected).toBeTruthy()
      done()
    },
    timeout
  )

  it(
    'Should be able to throw error if findByCategory method does not have a parameter',
    async done => {
      const animeRepository = new AnimeRepository(mongodbURITest)
      let error
      try {
        await animeRepository.findByCategory()
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
    'Should be able to find animes by category',
    async done => {
      const animeRepository = new AnimeRepository(mongodbURITest)
      const expected = await animeRepository.findByCategory(category)

      expect(expected).not.toBeUndefined()
      expect(expected).toHaveProperty('data')
      expect(expected).toHaveProperty('category')
      expect(expected.data[0]).toHaveProperty('_id')
      done()
    },
    timeout
  )

  it(
    'Should be able to find all categories animes',
    async done => {
      const animeRepository = new AnimeRepository(mongodbURITest)
      const expected = await animeRepository.findAll()

      expect(expected).not.toBeUndefined()
      expect(expected[0]).toHaveProperty('data')
      expect(expected[0]).toHaveProperty('category')
      done()
    },
    timeout
  )

  it(
    'Should be able to throw error if the collectionName is not defined when executing the method deleteByName',
    async done => {
      const animeRepository = new AnimeRepository(mongodbURITest)
      let error
      try {
        await animeRepository.deleteByName('Charlotte')
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
    'Should be able to throw error if not find anime by name',
    async done => {
      const animeRepository = new AnimeRepository(mongodbURITest)
      const expected = await animeRepository
        .category('C')
        .findByName('QUALQUER NOME')

      expect(expected).toBe(undefined)
      done()
    },
    timeout
  )

  it(
    'Should be able to find anime by name',
    async done => {
      const animeRepository = new AnimeRepository(mongodbURITest)
      const expected = await animeRepository
        .category('c')
        .findByName('Charlotte Atualizado')

      expect(expected).toHaveProperty('_id')
      done()
    },
    timeout
  )

  it(
    'Should be able to delete anime by name',
    async done => {
      const animeRepository = new AnimeRepository(mongodbURITest)
      const expected = await animeRepository
        .category(category)
        .deleteByName('Charlotte')

      expect(expected).toEqual(true)
      done()
    },
    timeout
  )
})
