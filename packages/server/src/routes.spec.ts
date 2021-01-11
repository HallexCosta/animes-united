import supertest from 'supertest'
import { app } from './app'

const request = supertest(app)

const timeout = 1000 * 60 * 10

describe('Test routes', () => {
  it(
    'Should be able to list animes (http://localhost:3333/animes)',
    async done => {
      const response = await request.get('/animes').send()

      expect(response.status).toEqual(200)
      expect(response.body.length > 0).toBeTruthy()
      expect(response.body).not.toEqual([])
      expect(response.body).not.toBeUndefined()
      expect(typeof response.body).toEqual('object')
      done()
    },
    timeout
  )

  it(
    'Should be able to list animes recommendation (http://localhost:3333/animes/recommendation)',
    async done => {
      const response = await request.get('/animes/recommendation').send()

      expect(response.status).toEqual(200)
      expect(response.body.length > 0).toBeTruthy()
      expect(response.body).not.toEqual([])
      expect(response.body).not.toBeUndefined()
      expect(typeof response.body).toEqual('object')
      done()
    },
    timeout
  )

  it(
    'Should be able to list last releases episodes (http://localhost:3333/animes/last-releases-episodes)',
    async done => {
      const response = await request
        .get('/animes/last-releases-episodes')
        .send()

      expect(response.status).toEqual(200)
      expect(response.body.length > 0).toBeTruthy()
      expect(response.body).not.toEqual([])
      expect(response.body).not.toBeUndefined()
      expect(typeof response.body).toEqual('object')
      done()
    },
    timeout
  )

  it(
    'Should be able to throw error if not received param name (http://localhost:3333/animes/:name)',
    async done => {
      const param = 'INVALID ANIME NAME'
      const response = await request.get(`/animes/${param}`).send()

      expect(response.status).toEqual(400)
      expect(response.body).toBeTruthy()
      expect(response.body).not.toEqual([])
      expect(response.body).not.toBeUndefined()
      expect(typeof response.body).toEqual('object')
      done()
    },
    timeout
  )

  it(
    'Should be able to list anime by name (http://localhost:3333/animes/:name)',
    async done => {
      const param = 'charlotte'
      const response = await request.get(`/animes/${param}`).send()

      expect(response.status).toEqual(200)
      expect(response.body).toBeTruthy()
      expect(response.body).not.toEqual([])
      expect(response.body).not.toBeUndefined()
      expect(typeof response.body).toEqual('object')
      done()
    },
    timeout
  )
})
