import { toUpperFirstCase } from './text'

describe('Test utils/text', () => {
  it('Should be able to upper case a fisrt letter of string', () => {
    expect(toUpperFirstCase('charlotte')).toEqual('Charlotte')
    expect(toUpperFirstCase('cHARLOTTE')).toEqual('Charlotte')
    expect(toUpperFirstCase('Charlotte')).toEqual('Charlotte')
  })
})
