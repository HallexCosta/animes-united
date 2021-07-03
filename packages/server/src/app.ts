import path from 'path'
import express from 'express'
import 'express-async-errors'

import { routes } from './routes'
import { logger } from './logger'

import { handleErrors } from '@middlewares'

const app = express()

logger()
  .then()
  .catch(e => console.error(e))

app.use(express.json())
app.use(routes)
app.use('/static', express.static(path.join(__dirname, 'uploads')))
app.use(handleErrors)

export { app }
