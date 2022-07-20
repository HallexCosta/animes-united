import { expect } from 'chai'

import Episode, { EpisodeProps } from '@domains/episode'

describe('@Episode', () => {
  describe('#constructor', () => {
    it('should assign property props from episode domain', () => {
      const episodePropsMock: EpisodeProps = {
        title: '',
        number: 0,
        thumbnail: '',
        quality_streamming: '',
        url: ''
      }

      const episode = new Episode(episodePropsMock)

      expect(episode.props).to.be.property('title')
      expect(episode.props).to.be.property('number')
      expect(episode.props).to.be.property('thumbnail')
      expect(episode.props).to.be.property('quality_streamming')
      expect(episode.props).to.be.property('url')
    })
  })
})
