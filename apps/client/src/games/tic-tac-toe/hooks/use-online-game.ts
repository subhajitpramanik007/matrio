import type {
  TOnlineGameResult,
  TOnlineTicTacToePlayer,
} from '@/games/tic-tac-toe/types'
import {
  TicTacToeOnlineGameDataContext,
  useOnlineTicTacToeFactory,
} from '@/games/tic-tac-toe/context/online-game'

export const useOnlineGame = TicTacToeOnlineGameDataContext.useReactContext

export const useOnlineGameManager = () => {
  const { dispatch, state } = useOnlineTicTacToeFactory()

  return {
    ...dispatch,
    isStarted: state.gameStarted,
  }
}

type GameResult = 'draw' | 'win' | 'lose' | 'none'

const ResultOptions: Record<
  GameResult,
  { label: string; message: string; className: string } | null
> = {
  draw: {
    label: 'Draw',
    message: "It's a draw",
    className: 'text-yellow-500 font-semibold text-xl',
  },
  win: {
    label: 'You Win',
    message: 'You win this round!',
    className: 'text-green-500 font-semibold text-xl',
  },
  lose: {
    label: 'You Lose',
    message: 'You lose this round!',
    className: 'text-destructive font-semibold text-xl',
  },
  none: null,
}

export const useGameResult = (
  playerId: string,
  result: TOnlineGameResult | null,
) => {
  const isGameOver = Boolean(result)

  const resultType = (): GameResult => {
    if (!result || !result.winnerId) return 'none'
    if (result.isDraw) return 'draw'
    if (result.winnerId === playerId) return 'win'
    return 'lose'
  }

  return {
    isGameOver,
    resultType: resultType(),
    resultDetails: ResultOptions[resultType()],
  }
}

type TurnType = 'waiting' | 'myTurn' | 'opponentTurn'

const turnTypeToMessage: Record<TurnType, string> = {
  waiting: 'Waiting for opponent...',
  myTurn: 'Your turn',
  opponentTurn: "Opponent's turn",
}

export const usePlayerTurn = (
  currentPlayer: TOnlineTicTacToePlayer,
  currentTurn: string | null,
) => {
  const checkTurn = (): TurnType => {
    if (currentTurn) {
      return currentTurn === currentPlayer.id ? 'myTurn' : 'opponentTurn'
    }

    return 'waiting'
  }

  return { turnType: checkTurn(), turnMessage: turnTypeToMessage[checkTurn()] }
}

export const usePlayers = () => {
  const { room, player } = useOnlineGame()
  const [firstPlayer, secondPlayer] = room.players

  const myIndex = firstPlayer.id === player.id ? 'first' : 'second'
  const vsText =
    myIndex === 'first'
      ? `You vs ${secondPlayer.username}`
      : `${firstPlayer.username} vs You`

  return { firstPlayer, secondPlayer, vsText, myIndex }
}
