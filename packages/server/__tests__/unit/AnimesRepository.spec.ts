import { expect, use } from 'chai'
import dirty from 'dirty-chai'
import promised from 'chai-as-promised'

import { AnimesRepository, IAnimesRepository } from '@repositories'
import { mongodbURITest } from '@common/configs/mongodb'
import { category, anime as animeStub } from './fakes/stubs'
import { Anime } from '@entities'

use(dirty)
use(promised)

describe('Animes Repository', () => {
  let repository: IAnimesRepository
  let anime: Anime

  before(() => {
    repository = new AnimesRepository(mongodbURITest)

    expect(repository).to.be.instanceOf(AnimesRepository)
  })

  beforeEach(async () => {
    anime = repository.create(animeStub)

    await repository.category(category).save(anime)

    repository = new AnimesRepository(mongodbURITest)
  })

  afterEach(async () => {
    await repository.category(category).deleteById(anime._id)
  })

  it('Should be able to store category in upper case to search in the correct collection from the database (IAnimesRepository.category).', () => {
    repository.category(category.toLowerCase())

    const expected = Reflect.get(repository, 'collectionName')

    expect(expected).to.be.equal(category.toUpperCase())
  })

  it('Should be able to create and return a new anime model (IAnimesRepository.create).', () => {
    const expected = repository.create(animeStub)

    expect(expected).to.be.instanceOf(Anime)
  })

  it('Should be able to find all animes categories (IAnimesRepository.findAll).', async () => {
    const expected = await repository.findAll()

    expect(expected[0].animes[0]).to.be.instanceOf(Anime)
    expect(expected[0].animes[0].name).to.be.equal(anime.name)
  })

  it('Should be able to find all animes through a category (IAnimesRepository.findByCategory).', async () => {
    const expected = await repository.category(category).findByCategory()

    expect(expected[0]).to.be.instanceOf(Anime)
  })

  it('Should be able to throw an error if there no a defined category (IAnimesRepository.findByCategory).', async () => {
    const expectedToAsyncThrow = repository.findByCategory()

    await expect(expectedToAsyncThrow).to.be.rejected()
  })

  it('Should be able to find anime through an id (IAnimesRepository.findById).', async () => {
    const expected = await repository.category(category).findById(anime._id)

    expect(expected).to.be.instanceOf(Anime)
  })

  it('Should be able to throw an error if there no defined category (IAnimesRepository.findByName).', async () => {
    const expectedToAsyncThrow = repository.findByName(animeStub.name)

    await expect(expectedToAsyncThrow).to.be.rejected()
  })

  it('Should be able to find anime through a name (IAnimesRepository.findByName).', async () => {
    const expected = await repository
      .category(category)
      .findByName(animeStub.name)

    expect(expected).to.be.instanceOf(Anime)
  })

  it('Should be able to throw an error if there no defined category (IAnimesRepository.updateById).', async () => {
    const expectedToAsyncThrow = repository.updateById(anime._id, {
      ...anime,
      name: '2Charlotte'
    })

    await expect(expectedToAsyncThrow).to.be.rejected()
  })

  it('Should be able to update anime through an id (IAnimesRepository.updateById).', async () => {
    const expected = await repository
      .category(category)
      .updateById(anime._id, { ...anime, name: '2Charlotte' })

    expect(expected.updatedCount).to.be.greaterThanOrEqual(1)
  })

  it('Should be able to throw an error if there no defined category (IAnimesRepository.updateByName).', async () => {
    const expectedToAsyncThrow = repository.updateByName(anime.name, {
      ...anime,
      name: '3Charlotte'
    })

    expect(expectedToAsyncThrow).to.be.rejected()
  })

  it('Should be able to update anime through a name (IAnimesRepository.updateByName).', async () => {
    const expected = await repository
      .category(category)
      .updateByName(anime.name, { ...anime, name: '3Charlotte' })

    expect(expected.updatedCount).to.be.greaterThanOrEqual(1)
  })

  it('Should be able to throw an error if there no defined category (IAnimesRepository.deleteById).', async () => {
    const expectedToAsyncThrow = repository.deleteById(anime._id)

    expect(expectedToAsyncThrow).to.be.rejected()
  })

  it('Should be able to delete anime through an id (IAnimesRepository.deleteById).', async () => {
    const expected = await repository.category(category).deleteById(anime._id)

    expect(expected.deletedCount).to.be.greaterThanOrEqual(1)
  })

  it('Should be able to throw an error if there no defined category (IAnimesRepository.deleteByName).', async () => {
    const expectedToAsyncThrow = repository.deleteByName(anime.name)

    expect(expectedToAsyncThrow).to.be.rejected()
  })

  it('Should be able to delete anime through a name (IAnimesRepository.deleteByName).', async () => {
    const expected = await repository
      .category(category)
      .deleteByName(anime.name)

    expect(expected.deletedCount).to.be.greaterThanOrEqual(1)
  })

  it('Should be able to throw an error if there no defined category (IAnimesRepository.save).', async () => {
    const expectedToAsyncThrow = repository.save(repository.create(animeStub))

    expect(expectedToAsyncThrow).to.be.rejected()
  })

  it('Should be able to save anime on database (IAnimesRepository.save).', async () => {
    const expected = await repository
      .category(category)
      .save(repository.create(animeStub))

    expect(expected).to.be.instanceOf(Anime)
  })

  it('Should be able to throw an error if there no a defined category (IAnimesRepository.saveMany).', async () => {
    const expectedToAsyncThrow = repository.saveMany([
      repository.create(animeStub)
    ])

    expect(expectedToAsyncThrow).to.be.rejected()
  })

  it('Should be able to save many animes on database (IAnimesRepository.saveMany).', async () => {
    const animes = await repository
      .category(category)
      .saveMany([repository.create(animeStub)])

    expect(animes[0]).to.be.instanceOf(Anime)
  })
})
