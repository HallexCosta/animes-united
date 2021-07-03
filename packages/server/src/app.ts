import path from 'path'
import express from 'express'

import { routes } from './routes'
import { logger } from './logger'

import { handleErrors } from '@middlewares'

import 'express-async-errors'

const app = express()

logger()
  .then()
  .catch(e => console.error(e))

app.use(express.json())
app.use(routes)
app.use(handleErrors)
app.use('/static', express.static(path.join(__dirname, 'uploads')))

export { app }
