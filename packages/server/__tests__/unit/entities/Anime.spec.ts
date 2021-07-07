import { expect, use } from 'chai'

import dirty from 'dirty-chai'

import { Anime, Episode, Streamings } from '@entities'

import { anime as animeStub } from '../fakes/stubs'

use(dirty)

describe('Anime Entity', () => {
  let anime: Anime

  before(() => {
    anime = new Anime(animeStub)
    expect(anime).to.be.instanceOf(Anime)
    console.log(anime)
  })

  it('Must be able to generate a unique id for AnimeEntity class with a length of 24 chars.', () => {
    expect(anime._id).to.be.length(24)
  })

  it('Must be able to sign Streamings with Streamings class.', () => {
    expect(anime.streamings).to.be.instanceOf(Streamings)
  })

  it('Must be able to sign Episodes with Episode class.', () => {
    expect(anime.streamings.episodes[0]).to.be.instanceOf(Episode)
  })

  it('Must be able to sign Ovas with Episode class.', () => {
    expect(anime.streamings.ovas[0]).to.be.instanceOf(Episode)
  })
})
