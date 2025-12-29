import { InitPlayerData } from '@matrio/shared/types/player.type'
import { DEFAULT_PLAYER_STATS } from '../../src/core/player'
import { CheckersPlayer, TCheckersPieceColor } from '../../src/games/checkers'

const playerData: InitPlayerData & { pieceColor: TCheckersPieceColor } = {
    id: 'id',
    socketId: 'socketid',
    username: 'user1',
    pieceColor: 'red',
}

describe('Checker player test', () => {
    const player1 = new CheckersPlayer({ ...playerData })

    test('Should be create', () => {
        expect(player1).toBeInstanceOf(CheckersPlayer)
    })

    test('Should be player color is red', () => {
        expect(player1.pieceColor).toBe('red')
    })

    test('Should be player color is black', () => {
        const player2 = new CheckersPlayer({ ...playerData, pieceColor: 'black' })
        expect(player2.pieceColor).toBe('black')
    })

    test('Should be serialize data', () => {
        const expectData: CheckersPlayer['serialize'] = {
            id: player1.id,
            username: player1.username,
            pieceColor: player1.pieceColor,
            avatar: undefined,
            isHost: false,
            isReady: false,
            noOfCaptures: 0,
            noOfMissedTurns: 0,
            stats: DEFAULT_PLAYER_STATS,
        }
        expect(player1.serialize).toEqual(expectData)
    })
})
