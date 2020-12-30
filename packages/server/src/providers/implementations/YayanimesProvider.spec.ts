import { AnimeCalendar, YayanimesProvider } from './YayanimesProvider'

function factoryYayanimesProvider() {
  const yayanimesProvider = new YayanimesProvider()
  return { yayanimesProvider }
}

describe('Test YayanimesProvider implementation', () => {
  beforeAll(() => {
    const { yayanimesProvider } = factoryYayanimesProvider()

    expect(yayanimesProvider).toBeInstanceOf(YayanimesProvider)
  })

  it('Should be able to return array with all animes names (YayanimesProvider.getAnimeNames)', async done => {
    const { yayanimesProvider } = factoryYayanimesProvider()
    const expected = await yayanimesProvider.getAnimeNames()

    expect(typeof expected).toEqual('object')
    expect(expected.length).not.toEqual(0)

    done()
  })

  it('Should be able to return base URL of yayanimes.net (YayanimesProvider.getBaseURL)', () => {
    const { yayanimesProvider } = factoryYayanimesProvider()
    const expected = yayanimesProvider.getBaseURL()

    expect(expected).toBe('https://yayanimes.net')
  })

  it('Should be able to return calendar of animes from yayanimes.net (Yayanimes.getAnimesCalendar)', async done => {
    const { yayanimesProvider } = factoryYayanimesProvider()
    const expected = yayanimesProvider.getAnimesCalendar()

    expect(expected).toEqual<AnimeCalendar[]>([
      {
        title: 'Munou na Nana',
        thumbnail: 'https://yayanimes.net/Calendario/MunounaNana.jpg'
      }
    ])

    done()
  })
})
