import { expect, use } from 'chai'

import dirty from 'dirty-chai'

import { Anime } from '@entities'

import { anime } from '../fakes/stubs'

use(dirty)

describe('Anime Entity', () => {
  before(() => {
    expect(anime).to.be.instanceOf(Anime)
  })

  it('Must be able to generate a unique id for AnimeEntity class with a length of 24 chars.', () => {
    expect(anime._id).to.be.length(24)
  })
})
