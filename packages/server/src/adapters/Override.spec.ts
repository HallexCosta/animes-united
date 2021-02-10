import { Override } from '.'

class UserOriginal {
  name: string
  developer: string

  constructor(props: UserOriginal) {
    Object.assign(this, props)
    Object.freeze(props)
  }
}

describe('Test Override Type', () => {
  it('Must be able to override the property value of type', () => {
    const userOverride: Override<UserOriginal, { developer: boolean }> = {
      name: 'Hállex',
      developer: true
    }
    const userOriginalInstance: UserOriginal = new UserOriginal({
      name: 'Hállex',
      developer: 'true'
    })

    expect(typeof userOriginalInstance.developer).toBe('string')
    expect(typeof userOverride.developer).toBe('boolean')
  })
})
