import { guid } from '@src'

describe('Hash Generator', () => {
  it('Should be able generate a unique id with length 24', () => {
    const uid = guid()

    expect(uid.length).toEqual(24)
    expect(typeof uid).toBe('string')
  })
})
