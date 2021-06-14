import { expect } from 'chai'
import { YayanimesProvider } from '@providers/implementations/YayanimesProvider'
import { factoryYayanimesProvider } from './factories'

describe('Mocha', () => {
  describe('Test YayanimesProvider implementation', () => {
    let yayanimesProvider: YayanimesProvider

    before(() => {
      yayanimesProvider = factoryYayanimesProvider()

      expect(yayanimesProvider).to.be.instanceof(YayanimesProvider)
    })

    it('Should be able to return array with all animes names (YayanimesProvider.getAnimeNames)', async () => {
      const expected = await yayanimesProvider.getAnimeNames()

      expect(typeof expected).to.equal('object')
      expect(expected.length).not.to.equal(0)
    })

    it('Should be able to return base URL of yayanimes.net (YayanimesProvider.getBaseURL)', () => {
      const expected = yayanimesProvider.getBaseURL()

      expect(expected).to.be.equal('https://yayanimes.net')
    })

    it('Should be able to return calendar of animes from yayanimes.net (Yayanimes.getAnimesCalendar)', async () => {
      const expected = await yayanimesProvider.getAnimesCalendar()

      expect(expected.length).not.to.equal(0)
    })

    it('Should be able to return release last episodes of yayanimes.net (YayanimesProvider.getLastReleasesEpisodes)', done => {
      yayanimesProvider
        .getLastReleasesEpisodes()
        .then(expected => {
          expect(expected.length).not.to.equal(0)
          done()
        })
        .catch(done)
    })
  })
})
