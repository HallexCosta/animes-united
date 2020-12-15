import express, { Application } from 'express'
import { routes } from './routes'
import { logger } from './logger'

const app: Application = express()

logger()
  .then()
  .catch(e => console.error(e))

app.use(routes)

export { app }
