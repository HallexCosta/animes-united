/* eslint-disable @typescript-eslint/no-explicit-any */
import { app } from './app'

const timeout = 1000 * 60 * 10

describe('Test server', () => {
  it(
    'Should be able listening server',
    () => {
      const server = app.listen(5000)
      const listening = server.listening
      const address = server.address() as any
      const port = address.port
      server.close()

      expect(listening).toBeTruthy()
      expect(port).toEqual(5000)
    },
    timeout
  )
})
