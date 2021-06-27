import { expect } from 'chai'
import { YayanimesProvider } from '@providers/implementations/YayanimesProvider'

function factoryYayanimesProvider() {
  const yayanimesProvider = new YayanimesProvider()

  return { yayanimesProvider }
}

describe('Test YayanimesProvider implementation', () => {
  before(() => {
    const { yayanimesProvider } = factoryYayanimesProvider()

    expect(yayanimesProvider).to.be.instanceOf(YayanimesProvider)
  })

  it('Should be able to return array with all animes names (YayanimesProvider.getAnimeNames)', async () => {
    const { yayanimesProvider } = factoryYayanimesProvider()
    const expected = await yayanimesProvider.getAnimeNames()

    expect(typeof expected).to.be.equal('object')
    expect(expected.length).not.to.be.equal(0)
  })

  it('Should be able to return base URL of yayanimes.net (YayanimesProvider.getBaseURL)', () => {
    const { yayanimesProvider } = factoryYayanimesProvider()
    const expected = yayanimesProvider.getBaseURL()

    expect(expected).to.be.equal('https://yayanimes.net')
  })

  it('Should be able to return calendar of animes from yayanimes.net (Yayanimes.getAnimesCalendar)', async () => {
    const { yayanimesProvider } = factoryYayanimesProvider()
    const expected = await yayanimesProvider.getAnimesCalendar()

    expect(expected.length).not.to.equal(0)
  })

  it('Should be able to return release last episodes of yayanimes.net (YayanimesProvider.getLastReleasesEpisodes)', async () => {
    const { yayanimesProvider } = factoryYayanimesProvider()
    const expected = await yayanimesProvider.getLastReleasesEpisodes()

    expect(expected.length).not.to.be.equal(0)
  })
})
