import { Either, Left, left, Right, right } from './Either'

class User {
  public readonly name: string
  public readonly email: string
  public readonly role: string
  constructor(props: User) {
    Object.assign(this, props)
    Object.freeze(this)
  }
}
class InvalidUser extends Error {
  public readonly message: string
  constructor() {
    super('User is invalid!')
  }
}

const factoryUser: () => User = () =>
  new User({
    name: 'Hállex Costa',
    email: 'hallex.costa@hotmail.com',
    role: 'developer'
  })

const factoryInvalidUser: () => Error = () => new InvalidUser()

function verifyIsInvalidUser(failed = true): Either<Error, User> {
  return failed ? left(factoryInvalidUser()) : right(factoryUser())
}

describe('Test Error Pattern (Either)', () => {
  beforeAll(() => {
    expect(factoryUser()).toBeInstanceOf(User)
    expect(factoryInvalidUser()).toBeInstanceOf(InvalidUser)
  })

  it('Must be able to verify isLeft type of InvalidUser', () => {
    const result = verifyIsInvalidUser()
    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).not.toBeTruthy()

    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(InvalidUser)
      expect(result.value.message).toBe('User is invalid!')
    }
  })

  it('Must be able to verify isRight is type of User', () => {
    const result = verifyIsInvalidUser(false)
    expect(result.isRight()).toBeTruthy()
    expect(result.isLeft()).not.toBeTruthy()
    expect(result.value).toBeInstanceOf(User)
  })

  it('Must be able to return Left class at invoke function left', () => {
    const user = factoryUser()
    expect(left(user)).toBeInstanceOf(Left)
    expect(left(user)).not.toBeInstanceOf(Right)
  })

  it('Must be able to return Right class at invoke function right', () => {
    const user = factoryUser()
    expect(right(user)).toBeInstanceOf(Right)
    expect(right(user)).not.toBeInstanceOf(Left)
  })
})
