import { Socket } from 'socket.io-client'
import { setupSocketsTest } from '../utils/setupSocketsTest'

const { createClient, connectClient, getIO } = setupSocketsTest()

describe('CheckersService', () => {
    let client1: Socket
    let client2: Socket

    beforeAll(async () => {
        client1 = createClient()
        client2 = createClient()

        await connectClient(client1)
        await connectClient(client2)
    })

    test('clients should connect', () => {
        expect(client1.connected).toBe(true)
        expect(client2.connected).toBe(true)
    })

    test('should receive server pings', (done) => {
        const io = getIO()

        io.emit('ping-test', { msg: 'hello' })

        client1.on('ping-test', (data) => {
            expect(data.msg).toBe('hello')
            done()
        })
    })
})
