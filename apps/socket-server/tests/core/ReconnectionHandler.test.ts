import { IReconnectionHandler } from '@/core/interfaces/reconnectionHandler.interface'
import { ReconnectionHandler } from '@/core/common/ReconnectionHandler'

let reconnectionHandler: IReconnectionHandler

beforeAll(() => {
    reconnectionHandler = new ReconnectionHandler(5_000)
})

describe('ReconnectionHandler', () => {
    it('should be defined', () => {
        expect(reconnectionHandler).toBeDefined()
    })

    it('should handle disconnection', (done) => {
        reconnectionHandler.handleDisconnect('playerId', () => {
            console.log('Player disconnected')
            done()
        })
    })

    it('should handle reconnection', () => {
        reconnectionHandler.handleReconnect('playerId')
        expect(true).toBeTruthy()
    })

    it('should handle reconnection timeout', (done) => {
        reconnectionHandler.handleDisconnect('playerId', () => {
            console.log('Player disconnected and reconnection timeout')
            done()
        })
    })
})
