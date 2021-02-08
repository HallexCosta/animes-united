import { Episode } from './Episode'
import { Streamings } from './Streamings'

function factoryStreamings() {
  const data = {
    ovas: [new Episode({} as Episode)],
    episodes: [new Episode({} as Episode)]
  }
  return {
    instance: new Streamings(data)
  }
}

describe('Entity Streamings', () => {
  beforeAll(() => {
    const { instance } = factoryStreamings()

    expect(instance).toBeInstanceOf(Streamings)
  })

  it('Must be able to array episodes and ovas on Entity Streamings ', () => {
    const { instance } = factoryStreamings()

    expect(instance.episodes[0]).toHaveProperty('id')
    expect(instance.ovas[0]).toHaveProperty('id')
    expect(instance.episodes[0].id).toHaveLength(24)
    expect(instance.ovas[0].id).toHaveLength(24)
  })

  it('Must be able to empty array episodes and ovas by default if there no are props on constructor Entity Streamings', () => {
    const streamings = new Streamings()

    expect(streamings.episodes).not.toBeUndefined()
    expect(streamings.ovas).not.toBeUndefined()
  })
})
