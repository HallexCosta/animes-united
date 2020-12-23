import { toUpperFirstCase } from './text'

describe('Test utils/text', () => {
  it('Should be able to upper case a fisrt letter of string', () => {
    const expected = toUpperFirstCase('charlotte')

    expect(expected).toEqual('Charlotte')
  })
})
