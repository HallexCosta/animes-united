import express, { Application } from 'express'
import { routes } from './routes'

const app: Application = express()

app.use(routes)

export { app }
