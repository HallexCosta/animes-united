import { Router } from 'express'

import animesRouter from '@routes/animes'

const routes = Router()

routes.get('/', (_, response) => response.end("I'm alive!"))
routes.use('/animes', animesRouter)

export default routes
