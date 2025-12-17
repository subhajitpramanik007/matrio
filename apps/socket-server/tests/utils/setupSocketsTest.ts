import { Server } from 'socket.io'
import { createTestServer } from './testServer'
import { createTestClient } from './testSocketClient'
import { Socket } from 'socket.io-client'

export function setupSocketsTest(port: number = 5050) {
    let io: Server
    let httpServer: any

    const clients: Socket[] = []

    const connect = (client: Socket) =>
        new Promise<void>((resolve, reject) => {
            client.on('connect', () => resolve())
            client.on('connect_error', (err) => reject(err))
            client.connect()
            console.log('Client connected')
        })

    const disconnect = async () => {
        for (const client of clients) client.disconnect()
    }

    beforeAll(async () => {
        const server = await createTestServer(port)
        io = server.io
        httpServer = server.httpServer
    })

    afterAll(async () => {
        await disconnect()
        io.close()
        httpServer.close()
    })

    return {
        /** Create a new client instance */
        createClient: () => {
            const client = createTestClient(port)
            clients.push(client)
            return client
        },

        /** Connect a client */
        connectClient: connect,

        /** Access server instance */
        getIO: () => io,
    }
}
