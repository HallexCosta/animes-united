import dirtyChai from 'dirty-chai'
import deepEqualInAnyOrder from 'deep-equal-in-any-order'
import { expect, use } from 'chai'
import sinon, { SinonSandbox } from 'sinon'

import AnimeHandler from '@core/animeHandler'
import AnimeCategory from '@domains/animeCategory'
import Utils from '@common/utils'

use(dirtyChai)
use(deepEqualInAnyOrder)

describe('@AnimeHandler', () => {
  let sandbox: SinonSandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  describe('#exportAnimesCategoriesInJSON', () => {
    it('should be save animes categories in json file', async () => {
      const createAndSaveFileStub = sandbox.stub(Utils, 'createAndSaveFile')

      const pathName = ''
      const animeHandler = new AnimeHandler()
      const animesCategoriesMocks = {} as AnimeCategory[]
      await animeHandler.exportAnimesCategoriesInJSON(pathName, animesCategoriesMocks)

      expect(createAndSaveFileStub.calledOnce).to.be.true()
    })
  })

  it('should be create empty objects with anime names', () => {
    const animeHandler = new AnimeHandler()
    const anime1Mock = {
      name: 'A.I.C.O',
      genre: '',
      image_url: '',
      rating: 0,
      synopsis: '',
      status: '',
      streamings: {
        episodes: [],
        ovas: []
      },
      studio: '',
      year_release: 0
    }
    const anime2Mock = {
      name: 'A.I.C.O',
      genre: '',
      image_url: '',
      rating: 0,
      synopsis: '',
      status: '',
      streamings: {
        episodes: [],
        ovas: []
      },
      studio: '',
      year_release: 0
    }
    const animeNamesMock = [anime1Mock.name, anime2Mock.name]
    const actual = animeHandler.createEmptyAnimesObject(animeNamesMock)
    const expected = [anime1Mock, anime2Mock]

    expect(actual).to.deep.equalInAnyOrder(expected)
    // or
    //expect(actual[0]).to.have.property('name')
    //expect(actual[0]).to.have.property('genre')
    //expect(actual[0]).to.have.property('image_url')
    //expect(actual[0]).to.have.property('rating')
    //expect(actual[0]).to.have.property('synopsis')
    //expect(actual[0]).to.have.property('status')
    //expect(actual[0]).to.have.property('streamings')
    //expect(actual[0].streamings).to.have.property('episodes')
    //expect(actual[0].streamings).to.have.property('ovas')
    //expect(actual[0]).to.have.property('studio')
    //expect(actual[0]).to.have.property('year_release')
  })

  describe("#separateAnimesByCategory", () => {
    it('should be separate array of animes objects in animes categories', () => {
      const anime1 = {
        name: 'A.I.C.O',
        genre: 'ficction',
        image_url: 'image.com.br',
        rating: 5,
        synopsis: 'This is synopsis',
        status: 'FHD',
        streamings: {
          episodes: [],
          ovas: []
        },
        studio: 'Koyta',
        year_release: 0
      }
      const anime2 = {
        name: 'Clannad',
        genre: 'ficction',
        image_url: 'image.com.br',
        rating: 5,
        synopsis: 'This is synopsis',
        status: 'FHD',
        streamings: {
          episodes: [],
          ovas: []
        },
        studio: 'Koyta',
        year_release: 0
      }
      const anime3 = {
        name: 'Charlotte',
        genre: 'ficction',
        image_url: 'image.com.br',
        rating: 5,
        synopsis: 'This is synopsis',
        status: 'FHD',
        streamings: {
          episodes: [],
          ovas: []
        },
        studio: 'Koyta',
        year_release: 0
      }
      const anime4 = {
        name: 'Violet Evergarden',
        genre: 'absurdism',
        image_url: 'image.com.br',
        rating: 5,
        synopsis: 'This is synopsis',
        status: 'FHD',
        streamings: {
          episodes: [],
          ovas: []
        },
        studio: 'Koyta',
        year_release: 0
      }
      const emptyAnimesMock = [anime1, anime2, anime3, anime4]
      const animesCategoriesMocks = [
        {
          category: 'A',
          animes: [anime1]
        },
        {
          category: 'C',
          animes: [anime2, anime3]
        },
        {
          category: 'V',
          animes: [anime4]
        }
      ]

      const animeHandler = new AnimeHandler()
      const actual = animeHandler.separateAnimesByCategory(emptyAnimesMock)

      expect(actual).to.deep.equalInAnyOrder(animesCategoriesMocks)
      // or
      //expect(actual[0].category).to.be.equals('A')
      //expect(actual[1].category).to.be.equals('C')
      //expect(actual[0].animes[0].name).to.be.equals(anime1.name)
      //expect(actual[1].animes[0].name).to.be.equals(anime2.name)
    })
  })
})
