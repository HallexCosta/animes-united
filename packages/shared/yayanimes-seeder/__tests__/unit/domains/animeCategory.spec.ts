import { expect } from 'chai'

import AnimeCategory, { AnimeCategoryProps } from '@domains/animeCategory'

describe('@AnimeCategory', () => {
  describe('#constructor', () => {
    it('should assign property props from AnimeCategory domain', () => {
      const animeCategoryPropsMock: AnimeCategoryProps = {
        category: '',
        animes: []
      }
      const animeCategory = new AnimeCategory(animeCategoryPropsMock)

      expect(animeCategory.props).to.be.property('category')
      expect(animeCategory.props).to.be.property('animes')
    })
  })
})
