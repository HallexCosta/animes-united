import { YayanimesProvider } from './YayanimesProvider'

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
})
