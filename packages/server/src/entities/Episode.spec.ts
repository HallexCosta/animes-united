import { Episode } from './Episode'

const factoryEpisode = function () {
  const data = {
    title: 'Charlotte – Episódio 01',
    number: 1,
    thumbnail:
      'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte01.jpg',
    qualityStreaming: 'HD',
    url: 'https://yayanimes.net/charlotte-episodio-1/'
  }
  return {
    data,
    instance: new Episode(data)
  }
}

describe('Entity Episode', () => {
  beforeAll(() => {
    const { instance } = factoryEpisode()
    expect(instance).toBeInstanceOf(Episode)
  })

  it('Generate unique ID for each Episode instance', () => {
    const { instance } = factoryEpisode()
    const { instance: instance2 } = factoryEpisode()

    expect(instance).toHaveProperty('id')
    expect(instance.id).toHaveLength(24)
    expect(instance.id !== instance2.id).toBeTruthy()
  })
})
