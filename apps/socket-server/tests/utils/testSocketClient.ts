import { io, Socket } from 'socket.io-client'

export function createTestClient(port: number = 5050): Socket {
    return io(`http://localhost:${port}`, {
        transports: ['websocket'],
        autoConnect: false,
    })
}
