import { getCurrentDate, getCurrentTime } from './date'

describe('Test utils/date', () => {
  it('Should be able to get current date in format (yyyy-mm-dd)', () => {
    const expected = getCurrentDate()

    expect(expected).toMatch(/\b(\d+\/\d+\/\d+)\b/g)
  })

  it('Should be able to get current time in format (h:m:s)', () => {
    const expected = getCurrentTime()

    expect(expected).toMatch(/\b(\d+\/\d+\/\d+)\b/g)
  })
})
