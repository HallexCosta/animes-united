import { random } from './lint-example'

describe('Lint Example', () => {
  it('random number', () => {
    expect(typeof random()).toBe('number')
  })
})
