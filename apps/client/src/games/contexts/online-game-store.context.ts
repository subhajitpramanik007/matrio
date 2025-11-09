import { useEffect, useReducer } from 'react'
import { GameEventsRequest } from '../types'
import type { TOnlineGameStoreState } from '../types'
import { createReactContext } from '@/lib/create-react-context'
import { useSocketEmit } from '@/hooks/socket'

// ---------------------------- TYPES ----------------------------
// Online Game Store types
type OnlineGameStore<
  TOnlineRoom = any,
  TOnlinePlayer = any,
  TOnlineGameResult = any,
> = {
  state: TOnlineGameStoreState<TOnlineRoom, TOnlinePlayer, TOnlineGameResult>
  dispatch: {
    handleUpdateRoom: (room: TOnlineRoom) => void
    handleUpdatePlayer: (player: TOnlinePlayer) => void
    handleUpdateGameResult: (gameResult: TOnlineGameResult) => void
    handleUpdateBoard: (board: TOnlineGameResult) => void
    reset: () => void
  }
  socketEventDispatch: {
    onGameStarted: (room: TOnlineRoom) => void
    onGameResult: (data: {
      result: TOnlineGameResult
      room: TOnlineRoom
    }) => void
    onGetPlayerData: (player: TOnlinePlayer) => void
    onPlayerJoined: () => void
    onRoomDeleted: () => void
    onPlayerLeft: () => void
  }
}

// initial state
const DEFAULT_STATE: TOnlineGameStoreState = {
  gameStarted: false,
  room: null,
  player: null,
  gameResult: null,
}

// ------------------------------- REDUCER -------------------------------
type TOnlineGameStoreReducerActions<
  TOnlineRoom = any,
  TOnlinePlayer = any,
  TOnlineGameResult = any,
> =
  | { type: 'SET_GAME_STARTED'; payload: boolean }
  | { type: 'SET_ROOM'; payload: TOnlineRoom }
  | { type: 'SET_PLAYER'; payload: TOnlinePlayer }
  | { type: 'SET_GAME_RESULT'; payload: TOnlineGameResult }
  | { type: 'RESET' }

function gameStoreReducer<
  TOnlineRoom = any,
  TOnlinePlayer = any,
  TOnlineGameResult = any,
>(
  state: TOnlineGameStoreState<TOnlineRoom, TOnlinePlayer, TOnlineGameResult>,
  action: TOnlineGameStoreReducerActions<
    TOnlineRoom,
    TOnlinePlayer,
    TOnlineGameResult
  >,
): TOnlineGameStoreState<TOnlineRoom, TOnlinePlayer, TOnlineGameResult> {
  switch (action.type) {
    case 'SET_GAME_STARTED':
      return { ...state, gameStarted: action.payload }
    case 'SET_ROOM':
      return { ...state, room: action.payload }
    case 'SET_PLAYER':
      return { ...state, player: action.payload }
    case 'SET_GAME_RESULT':
      return { ...state, gameResult: action.payload }
    default:
      return state
  }
}

// ---------------------------- CONTEXT ----------------------------

export const OnlineGameStoreContext = <
  TOnlineRoom = any,
  TOnlinePlayer = any,
  TOnlineGameResult = any,
>(
  gameName: string,
) =>
  createReactContext<
    OnlineGameStore<TOnlineRoom, TOnlinePlayer, TOnlineGameResult>
  >(
    () => {
      const [state, dispatch] = useReducer(gameStoreReducer, DEFAULT_STATE)

      const { emit: leaveRoom } = useSocketEmit({
        event: GameEventsRequest.LEAVE_ROOM,
        errorMsg: 'Error while leaving game',
      })

      const handleUpdateRoom = (room: TOnlineRoom) => {
        dispatch({ type: 'SET_ROOM', payload: room })
      }

      const handleUpdatePlayer = (player: TOnlinePlayer) => {
        dispatch({ type: 'SET_PLAYER', payload: player })
      }

      const handleUpdateGameResult = (gameResult: TOnlineGameResult) => {
        dispatch({ type: 'SET_GAME_RESULT', payload: gameResult })
      }

      const handleUpdateBoard = (board: TOnlineGameResult) => {
        dispatch({ type: 'SET_GAME_RESULT', payload: board })
      }

      const reset = () => {
        dispatch({ type: 'RESET' })
      }

      const onGameStarted = (room: TOnlineRoom) => {
        dispatch({ type: 'SET_GAME_STARTED', payload: true })
        dispatch({ type: 'SET_ROOM', payload: room })
      }

      const onGameResult = (data: {
        result: TOnlineGameResult
        room: TOnlineRoom
      }) => {
        dispatch({ type: 'SET_GAME_RESULT', payload: data.result })
        dispatch({ type: 'SET_ROOM', payload: data.room })
      }

      const onGetPlayerData = (player: TOnlinePlayer) => {
        dispatch({ type: 'SET_PLAYER', payload: player })
      }

      const onPlayerJoined = () => {}

      const onRoomDeleted = () => {
        dispatch({ type: 'RESET' })
      }

      const onPlayerLeft = () => {
        dispatch({ type: 'RESET' })
      }

      useEffect(() => {
        return () => {
          leaveRoom()
        }
      }, [])

      return {
        state,
        dispatch: {
          handleUpdateRoom,
          handleUpdatePlayer,
          handleUpdateGameResult,
          handleUpdateBoard,
          reset,
        },
        socketEventDispatch: {
          onGameStarted,
          onGameResult,
          onGetPlayerData,
          onPlayerJoined,
          onRoomDeleted,
          onPlayerLeft,
        },
      }
    },
    { name: `Online Game Store ${gameName}` },
  )
