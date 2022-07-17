import { expect } from 'chai'

import Anime, { AnimeProps } from '@domains/anime'

describe('@Anime', () => {
  describe('#constructor', () => {
    it('should assign property props from anime domain', () => {
      const animePropsMock: AnimeProps = {
        name: '',
        genre: '',
        image_url: '',
        rating: 0,
        synopsis: '',
        status: '',
        streamings: {
          ovas: [],
          episodes: []
        },
        studio: '',
        year_release: 0
      }

      const anime = new Anime(animePropsMock)

      expect(anime.props).to.be.property('name')
      expect(anime.props).to.be.property('genre')
      expect(anime.props).to.be.property('image_url')
      expect(anime.props).to.be.property('rating')
      expect(anime.props).to.be.property('synopsis')
      expect(anime.props).to.be.property('status')
      expect(anime.props).to.be.property('streamings')
      expect(anime.props).to.be.property('studio')
      expect(anime.props).to.be.property('year_release')
    })
  })
})
