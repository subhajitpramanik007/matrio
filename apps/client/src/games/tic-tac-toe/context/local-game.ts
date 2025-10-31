import { useState } from 'react'
import type { TicTacToeCell, TicTacToeSymbol } from '@/games/tic-tac-toe/types'

import { createReactContext } from '@/lib/create-react-context'
import { WINNING_COMBINATIONS_TIC_TAC_TOE } from '@/games/tic-tac-toe/constants'

interface TicTacToeLocalGameContext {
  board: TicTacToeCell[]
  currentPlayer: TicTacToeSymbol | null
  winner: TicTacToeSymbol | 'tie' | null
  score: { first: number; second: number; ties: number }
  resetGame: () => void
  resetScore: () => void
  handleCellClick: (index: number) => void
}

const INITIAL_BOARD: TicTacToeCell[] = Array(9).fill(null)

export const TicTacToeLocalGameContext =
  createReactContext<TicTacToeLocalGameContext>(
    () => {
      const [board, setBoard] = useState<TicTacToeCell[]>(INITIAL_BOARD)
      const [currentPlayer, setCurrentPlayer] =
        useState<TicTacToeSymbol | null>(null)
      const [winner, setWinner] = useState<TicTacToeSymbol | 'tie' | null>(null)
      const [score, setScore] = useState({ first: 0, second: 0, ties: 0 })

      const checkWinner = (
        currentBoard: TicTacToeCell[],
      ): TicTacToeSymbol | 'tie' | null => {
        for (const combination of WINNING_COMBINATIONS_TIC_TAC_TOE) {
          const [a, b, c] = combination
          if (
            currentBoard[a] &&
            currentBoard[a] === currentBoard[b] &&
            currentBoard[a] === currentBoard[c]
          ) {
            return currentBoard[a]
          }
        }

        if (currentBoard.every((cell) => cell !== null)) {
          return 'tie'
        }

        return null
      }

      const resetGame = () => {
        setBoard(INITIAL_BOARD)
        setCurrentPlayer('X')
        setWinner(null)
      }

      const resetScore = () => {
        setScore({ first: 0, second: 0, ties: 0 })
        resetGame()
      }

      const updateScore = (result: TicTacToeCell | 'tie') => {
        setScore((prev) => ({
          ...prev,
          first: result === 'X' ? prev.first + 1 : prev.first,
          second: result === 'O' ? prev.second + 1 : prev.second,
          ties: result === 'tie' ? prev.ties + 1 : prev.ties,
        }))
      }

      const handleCellClick = (index: number) => {
        if (board[index] || winner) return

        const newBoard = [...board]
        newBoard[index] = currentPlayer === 'X' ? 'X' : 'O'
        setBoard(newBoard)
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')

        const gameResult = checkWinner(newBoard)
        if (gameResult) {
          setWinner(gameResult)
          updateScore(gameResult)
          return
        }
      }

      return {
        board,
        currentPlayer,
        winner,
        score,
        resetGame,
        resetScore,
        handleCellClick,
      }
    },
    { name: 'TicTacToeLocalGame' },
  )

export const TicTacToeLocalGameProvider = TicTacToeLocalGameContext.Provider
export const useTicTacToeLocalGame = TicTacToeLocalGameContext.useReactContext
