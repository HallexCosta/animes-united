import { getCurrentDate, getCurrentTime } from './date'

describe('Test utils/date', () => {
  it('Should be able to get current date in format (yyyy-mm-dd)', () => {
    const expected = getCurrentDate()

    expect(expected).toMatch(
      /([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])/g
    )
  })

  it('Should be able to get current time in format (h:m:s)', () => {
    const expected = getCurrentTime()

    expect(expected).toMatch(/([0-9][0-9]):([0-9][0-9]):([0-9][0-9])/g)
  })
})
