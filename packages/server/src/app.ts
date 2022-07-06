import path from 'path'
import express from 'express'
import 'express-async-errors'

import routes from '@routes'

import { handleErrors } from '@middlewares/handleErrors'

const app = express()

app.use(express.json())
app.use(routes)
app.use('/static', express.static(path.join(__dirname, 'uploads')))
app.use(handleErrors)

export { app }
