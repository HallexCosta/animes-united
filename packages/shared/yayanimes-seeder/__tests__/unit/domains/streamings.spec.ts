import { expect } from 'chai'

import { EpisodeProps } from '@domains/episode'
import Streamings, { StreamingsProps } from '@domains/streamings'

describe('@Streamings', () => {
  describe('#constructor', () => {
    it('should assign property props from streamings domain', () => {
      const ovas: EpisodeProps[] = []
      const episodes: EpisodeProps[] = []
      const streamingsPropsMock: StreamingsProps = {
        ovas,
        episodes
      }

      const streamings = new Streamings(streamingsPropsMock)

      expect(streamings.props).to.be.property('episodes')
      expect(streamings.props).to.be.property('ovas')
    })
  })
})
