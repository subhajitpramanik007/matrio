import { toast } from 'sonner'
import { useEffect, useReducer } from 'react'
import type { TCheckersBoard, TCheckersPieceColor } from '@matrio/shared/checkers/types'
import {
  calculateWinner,
  checkersMove,
  initialCheckersBoard,
} from '@/games/checkers/checkers.utils'

type LocalGameState = {
  board: TCheckersBoard
  currentPlayerColor: TCheckersPieceColor
  result: { [key in TCheckersPieceColor]: number }
}

type LocalGameActions =
  | { type: 'SET_BOARD'; payload: TCheckersBoard }
  | { type: 'SET_CURRENT_PLAYER_COLOR'; payload: TCheckersPieceColor }
  | { type: 'UPDATE_BOARD'; payload: TCheckersBoard }
  | { type: 'NEXT_PLAYER' }
  | { type: 'GAME_OVER'; payload: TCheckersPieceColor }
  | { type: 'RESET' }

const INIT_CHECKERS_BOARD: TCheckersBoard = initialCheckersBoard()

function reducer(state: LocalGameState, action: LocalGameActions): LocalGameState {
  switch (action.type) {
    case 'SET_BOARD':
      return { ...state, board: action.payload }
    case 'SET_CURRENT_PLAYER_COLOR':
      return { ...state, currentPlayerColor: action.payload }
    case 'UPDATE_BOARD':
      return { ...state, board: action.payload }
    case 'NEXT_PLAYER':
      return { ...state, currentPlayerColor: state.currentPlayerColor === 'red' ? 'black' : 'red' }
    case 'GAME_OVER':
      return {
        ...state,
        result: { ...state.result, [action.payload]: state.result[action.payload] + 1 },
      }
    case 'RESET':
      return { ...state, board: INIT_CHECKERS_BOARD }
    default:
      return state
  }
}

const INIT_LOCAL_GAME_STATE: LocalGameState = {
  board: INIT_CHECKERS_BOARD,
  currentPlayerColor: 'red',
  result: {
    red: 0,
    black: 0,
  },
}

export const useCheckersLocalGame = () => {
  const [state, dispatch] = useReducer(reducer, INIT_LOCAL_GAME_STATE)

  function handleClickToCell(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement
    const cellEl = target.closest('[data-cell]')
    if (!cellEl) return

    const [row, col] = cellEl.getAttribute('data-cell')!.replace('cell-', '').split('-').map(Number)

    const [newBoard, moveMade] = checkersMove(state.board, state.currentPlayerColor, [row, col])

    dispatch({ type: 'UPDATE_BOARD', payload: newBoard })

    if (moveMade) {
      dispatch({ type: 'NEXT_PLAYER' })
    }

    const winner = calculateWinner(newBoard)
    if (winner) {
      toast.success(`Player ${winner} won!`)
      dispatch({ type: 'GAME_OVER', payload: winner })
      dispatch({ type: 'RESET' })
    }
  }

  useEffect(() => {
    dispatch({ type: 'RESET' })
  }, [])

  return { ...state, dispatch, handleClickToCell }
}
