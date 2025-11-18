import cors from 'cors'

import http from 'http'
import express from 'express'
import { router } from './routes'

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())

const httpServer = http.createServer(app)

app.use('/', router)

export { app, httpServer }
