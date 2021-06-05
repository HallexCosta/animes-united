import { YayanimesProvider } from '@providers/implementations/YayanimesProvider'

const timeout = 1000 * 60 * 10

function factoryYayanimesProvider() {
  const yayanimesProvider = new YayanimesProvider()

  return { yayanimesProvider }
}

describe('Test YayanimesProvider implementation', () => {
  beforeAll(() => {
    const { yayanimesProvider } = factoryYayanimesProvider()

    expect(yayanimesProvider).toBeInstanceOf(YayanimesProvider)
  }, timeout)

  it(
    'Should be able to return array with all animes names (YayanimesProvider.getAnimeNames)',
    async done => {
      const { yayanimesProvider } = factoryYayanimesProvider()
      const expected = await yayanimesProvider.getAnimeNames()

      expect(typeof expected).toEqual('object')
      expect(expected.length).not.toEqual(0)

      done()
    },
    timeout
  )

  it(
    'Should be able to return base URL of yayanimes.net (YayanimesProvider.getBaseURL)',
    () => {
      const { yayanimesProvider } = factoryYayanimesProvider()
      const expected = yayanimesProvider.getBaseURL()

      expect(expected).toBe('https://yayanimes.net')
    },
    timeout
  )

  it(
    'Should be able to return calendar of animes from yayanimes.net (Yayanimes.getAnimesCalendar)',
    async done => {
      const { yayanimesProvider } = factoryYayanimesProvider()
      const expected = await yayanimesProvider.getAnimesCalendar()

      expect(expected.length).not.toEqual(0)

      done()
    },
    timeout
  )

  it(
    'Should be able to return release last episodes of yayanimes.net (YayanimesProvider.getLastReleasesEpisodes)',
    async done => {
      const { yayanimesProvider } = factoryYayanimesProvider()
      const expected = await yayanimesProvider.getLastReleasesEpisodes()

      expect(expected.length).not.toEqual(0)

      done()
    },
    timeout
  )
})
