/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint no-unused-expressions: "off" */

import { expect } from 'chai'
import { mongodbURITest } from '@common/configs/mongodb'
import { Episode } from '@entities'
import { Anime } from '@entities/Anime'
import { AnimeRepository } from '@repositories/implementations/AnimeRepository'
import { ObjectId } from 'mongodb'

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
  it('Should be able to generate a new instance of class AnimeRepository', () => {
    const animeRepository = new AnimeRepository(mongodbURITest)

    expect(animeRepository).to.be.instanceOf(AnimeRepository)
  })

  it('Should be able return IAnimeRepository contract in method AnimeRepository.category', () => {
    const animeRepository = new AnimeRepository(mongodbURITest)
    const expected = animeRepository.category(category)

    expect(expected).to.be.instanceOf(AnimeRepository)
  })

  it('Should be able to save an anime with successfully', async () => {
    const animeRepository = new AnimeRepository(mongodbURITest)
    const expected = await animeRepository.category(category).save(anime)

    expect(expected).to.be.true
  })

  it('Should be able to throw error if not update anime by id (AnimeRepository.updateById)', async () => {
    const animeRepository = new AnimeRepository(mongodbURITest)

    let error

    try {
      await animeRepository
        .category(category)
        .updateById(anime, new ObjectId('abcabcabcabcabcabcabcabc'))
    } catch (e) {
      error = e
    }

    expect(error.name).to.be.equal('Error')
    expect(error.message).to.be.equal('Failed to update anime by id')
  })

  it('Should be able to updateById an anime with successfully (AnimeRepository.updateById)', async () => {
    const animeRepository = new AnimeRepository(mongodbURITest)

    const expected = await animeRepository.category(category).updateById(
      {
        ...anime,
        name: 'Charlotte Atualizado'
      },
      anime._id
    )

    expect(expected).to.be.true
  })

  it('Should be able to throw error if not update anime by name (AnimeRepository.updateByName)', async () => {
    const animeRepository = new AnimeRepository(mongodbURITest)

    const expectedToThrow = async () => {
      await animeRepository
        .category(category)
        .updateByName(anime, 'abcabcabcabcabcabcabcabc')
    }

    expect(expectedToThrow).to.be.throw
  })

  it('Should be able to updateByName an anime with successfully (AnimeRepository.updateByName)', async () => {
    const animeRepository = new AnimeRepository(mongodbURITest)

    const animeName = 'Charlotte Atualizado'
    const updatedName = 'Charlotte Atualizado 2'
    await animeRepository.category(category).updateByName(
      {
        ...anime,
        name: updatedName
      },
      animeName
    )

    const animeUpdated = (await animeRepository
      .category(category)
      .findByName(updatedName)) as Anime

    expect(animeUpdated.name).to.be.equal(updatedName)
  })

  it('Should be able to throw error if findByCategory method does not have a parameter', async () => {
    const animeRepository = new AnimeRepository(mongodbURITest)
    let error
    try {
      await animeRepository.findByCategory()
    } catch (e) {
      error = e
    }
    expect(error.name).to.be.equal('Error')
    expect(error.message).to.be.equal('Collection name not defined')
  })

  it('Should be able to find animes by category', async () => {
    const animeRepository = new AnimeRepository(mongodbURITest)
    const expected = await animeRepository.findByCategory(category)

    expect(expected).not.to.be.undefined
    expect(expected).to.have.property('data')
    expect(expected).to.have.property('category')
    expect(expected.data[0]).to.have.property('_id')
  })

  it('Should be able to find all categories animes', async () => {
    const animeRepository = new AnimeRepository(mongodbURITest)
    const expected = await animeRepository.findAll()

    expect(expected).not.to.be.undefined
    expect(expected[0]).to.have.property('data')
    expect(expected[0]).to.have.property('category')
  })

  it('Should be able to throw error if the collectionName is not defined when executing the method deleteByName', async () => {
    const animeRepository = new AnimeRepository(mongodbURITest)
    let error
    try {
      await animeRepository.deleteByName('Charlotte')
    } catch (e) {
      error = e
    }
    expect(error.name).to.be.equal('Error')
    expect(error.message).to.be.equal('Collection name not defined')
  })

  it('Should be able to throw error if not find anime by name', async () => {
    const animeRepository = new AnimeRepository(mongodbURITest)
    const expected = await animeRepository
      .category('C')
      .findByName('QUALQUER NOME')

    expect(expected).to.be.undefined
  })

  it('Should be able to find anime by name', async () => {
    const animeRepository = new AnimeRepository(mongodbURITest)
    const expected = await animeRepository
      .category('c')
      .findByName('Charlotte Atualizado 2')

    expect(expected).to.have.property('_id')
  })

  it('Should be able to delete anime by name', async () => {
    const animeRepository = new AnimeRepository(mongodbURITest)
    const expected = await animeRepository
      .category(category)
      .deleteByName('Charlotte')

    expect(expected).to.be.true
  })
})
