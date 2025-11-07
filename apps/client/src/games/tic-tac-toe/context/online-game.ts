import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import type {
  TOnlineGameResult,
  TOnlineTicTacToePlayer,
  TOnlineTicTacToeRoom,
  TicTacToeCell,
} from '@/games/tic-tac-toe/types'
import { createReactContext } from '@/lib/create-react-context'

import {
  useGameRestartEmit,
  usePlayLeaveEmit,
  usePlayerMoveEmit,
} from '@/games/tic-tac-toe/hooks/socket'
import {
  showGameErrorNotification,
  showGameNotification,
} from '@/games/components/show-game-notification'

type TOnlineTicTacToeState = {
  gameStarted: boolean
  room: TOnlineTicTacToeRoom | null
  player: TOnlineTicTacToePlayer | null
  gameResult: TOnlineGameResult | null
}

type SocketEventDispatch = {
  onGameStarted: (room: TOnlineTicTacToeRoom) => void
  onPlayerMoved: (data: { board: TicTacToeCell[]; nextTurn: string }) => void
  onGameResult: (data: {
    result: TOnlineGameResult
    room: TOnlineTicTacToeRoom
  }) => void
  onGetPlayerData: (player: TOnlineTicTacToePlayer) => void
  onPlayerJoined: () => void
  onRoomDeleted: () => void
  onPlayerLeft: () => void
}

type TOnlineTicTacToeDispatch = {
  handlePlayerMove: (cell: number) => void
  handleUpdateRoom: (room: TOnlineTicTacToeRoom) => void
  handleUpdateBoard: (board: TicTacToeCell[]) => void
  handleRestartGame: () => void
  reset: () => void
}

type TOnlineTicTacToeActions = {
  socketEventDispatch: SocketEventDispatch
  dispatch: TOnlineTicTacToeDispatch
}

type TOnlineTicTacToeContext = {
  state: TOnlineTicTacToeState
} & TOnlineTicTacToeActions

function OnlineTicTacToeContextFactory(): TOnlineTicTacToeContext {
  const navigate = useNavigate()

  const [gameStarted, setGameStarted] = useState(false)
  const [room, setRoom] = useState<TOnlineTicTacToeRoom | null>(null)
  const [player, setPlayer] = useState<TOnlineTicTacToePlayer | null>(null)
  const [gameResult, setGameResult] = useState<TOnlineGameResult | null>(null)

  const { emit: playerMoveEmit } = usePlayerMoveEmit()
  const { emit: playLeaveEmit } = usePlayLeaveEmit()
  const { emit: gameRestartEmit } = useGameRestartEmit()

  const reset = useCallback(() => {
    setGameStarted(false)
    setRoom(null)
    setPlayer(null)
    setGameResult(null)
  }, [])

  const handleUpdateRoom = useCallback((updatedRoom: TOnlineTicTacToeRoom) => {
    setRoom(updatedRoom)
  }, [])

  const handleUpdateBoard = useCallback((board: TicTacToeCell[]) => {
    setRoom((prevRoom) => {
      if (!prevRoom) return prevRoom
      return { ...prevRoom, board }
    })
  }, [])

  const onGameStarted = useCallback((roomData: TOnlineTicTacToeRoom) => {
    setGameStarted(true)
    setRoom(roomData)
  }, [])

  const onPlayerMoved = useCallback(
    (data: { board: TicTacToeCell[]; nextTurn: string }) => {
      setRoom((prevRoom) => ({
        ...prevRoom!,
        board: data.board,
        turn: data.nextTurn,
      }))
    },
    [],
  )

  const onGameResult = useCallback(
    (data: { result: TOnlineGameResult; room: TOnlineTicTacToeRoom }) => {
      setGameResult(data.result)
      setRoom(data.room)
    },
    [],
  )

  const onGetPlayerData = useCallback((playerData: TOnlineTicTacToePlayer) => {
    setPlayer(playerData)
  }, [])

  const onPlayerJoined = () => {}

  const onRoomDeleted = useCallback(() => {
    navigate({ to: '/games/$game', params: { game: 'tic-tac-toe' } })
    showGameNotification('Room has been deleted')
  }, [])

  const onPlayerLeft = useCallback(() => {
    navigate({ to: '/games/$game', params: { game: 'tic-tac-toe' } })
    showGameNotification('Opponent has left the game')
  }, [])

  const handlePlayerMove = useCallback(
    (cell: number) => {
      if (!room) {
        console.error('Room not found')
        return
      }

      const isYourTurn = room.turn === player?.id

      if (!isYourTurn) {
        showGameErrorNotification('It is not your turn')
        return
      }

      if (room.board[cell] !== null) {
        showGameErrorNotification('Cell is already occupied')
        return
      }

      playerMoveEmit({ roomCode: room.roomCode, cell })
    },
    [room, player],
  )

  const handleRestartGame = useCallback(() => {
    if (room) gameRestartEmit({ roomCode: room.roomCode })

    setGameResult(null)
    handleUpdateBoard(Array(9).fill(null))
  }, [room])

  useEffect(() => {
    return () => {
      playLeaveEmit({ roomCode: room?.roomCode })
      reset()
    }
  }, [])

  return {
    state: {
      gameStarted,
      room,
      player,
      gameResult,
    },
    dispatch: {
      handlePlayerMove,
      handleUpdateRoom,
      handleUpdateBoard,
      handleRestartGame,
      reset,
    },
    socketEventDispatch: {
      onGameStarted,
      onPlayerMoved,
      onGameResult,
      onGetPlayerData,
      onPlayerJoined,
      onRoomDeleted,
      onPlayerLeft,
    },
  }
}

const OnlineTicTacToeContext = createReactContext<TOnlineTicTacToeContext>(
  OnlineTicTacToeContextFactory,
  { name: 'TicTacToe Online Factory' },
)

export const useOnlineTicTacToeFactory = OnlineTicTacToeContext.useReactContext
export const OnlineTicTacToeProvider = OnlineTicTacToeContext.Provider

// game data
function TicTacToeOnlineGameDataFactory() {
  const { state } = useOnlineTicTacToeFactory()
  const { room, player, gameStarted, ...restState } = state

  if (gameStarted && !room) {
    throw new Error('Room not found')
  }

  if (gameStarted && !player) {
    throw new Error('Player not found')
  }

  return {
    room: room!,
    player: player!,
    gameStarted,
    ...restState,
  }
}

export const TicTacToeOnlineGameDataContext = createReactContext(
  TicTacToeOnlineGameDataFactory,
  { name: 'TicTacToe Online Data' },
)

export const TicTacToeOnlineGameDataProvider =
  TicTacToeOnlineGameDataContext.Provider

export const useTicTacToeOnlineGameData = () =>
  TicTacToeOnlineGameDataContext.useReactContext
