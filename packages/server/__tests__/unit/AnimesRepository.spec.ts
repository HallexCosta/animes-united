import { expect, use } from 'chai'
import dirty from 'dirty-chai'

use(dirty)

describe('Animes Repository', () => {
  it(
    'Should be able to store category to search in the correct collection from the database (IAnimesRepository.category).'
  )
  it(
    'Should be able to create and return a new anime model (IAnimesRepository.create).'
  )
  it(
    'Should be able to find all animes categories (IAnimesRepository.findAll).'
  )
  it(
    'Should be able to find all animes through a category (IAnimesRepository.findByCategory).'
  )
  it('Should be able to find anime through an id (IAnimesRepository.findById).')
  it(
    'Should be able to find anime through a name (IAnimesRepository.findByName).'
  )
  it(
    'Should be able to update anime through an id (IAnimesRepository.updateById).'
  )
  it(
    'Should be able to update anime through a name (IAnimesRepository.updateByName).'
  )
  it(
    'Should be able to delete anime through an id (IAnimesRepository.deleteById).'
  )
  it(
    'Should be able to delete anime through a name (IAnimesRepository.deleteByName).'
  )
  it(
    'Should be able to throw an error if not anime save on database (IAnimesRepository.save).'
  )
})
