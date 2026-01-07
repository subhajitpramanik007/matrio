import cors from 'cors'

import http from 'http'
import express from 'express'
import { router } from './routes'
import { ENV } from './config/env'
import { startSocketServer } from './startSocketServer'

const app = express()

app.use(cors({ origin: ENV.CORS_ORIGIN }))
app.use(express.json())

// Initialize HTTP server and router
const httpServer = http.createServer(app)
app.use('/', router)

// Initialize WebSocketServer and start game server
startSocketServer(httpServer)

export { app, httpServer }
