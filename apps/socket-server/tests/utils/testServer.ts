import { Server } from 'socket.io'
import { createServer } from 'http'

export function createTestServer(port: number = 5050) {
    const httpServer = createServer()
    const io = new Server(httpServer, {
        cors: { origin: '*' },
    })

    return new Promise<{ io: Server; httpServer: any }>((resolve) => {
        httpServer.listen(port, () => {
            resolve({ io, httpServer })
        })
    })
}
