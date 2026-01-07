import express from 'express'
import { SocketServerFactory } from '../gateway/SocketServerFactory'

const adminRoute = express.Router()

adminRoute.get('/players', (req, res) => {
    const players = SocketServerFactory.GetAllPlayers()
    res.json(players)
})

adminRoute.use('/players-list', express.static('public/admin/players'))

// log monitor
adminRoute.use('/monitor', express.static('public/admin/monitor'))

export default adminRoute
