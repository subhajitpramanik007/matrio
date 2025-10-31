'use client'

import { useState } from 'react'

import type { TicTacToeCell, TicTacToeSymbol } from '@/games/tic-tac-toe/types'
import { WINNING_COMBINATIONS_TIC_TAC_TOE } from '@/games/tic-tac-toe/constants'

export type AIGameDifficulty = 'easy' | 'medium' | 'hard'
type CurrentPlayer = TicTacToeSymbol | null
type Winner = TicTacToeSymbol | 'tie' | null

export function useTicTacToeAIGame() {
  const [board, setBoard] = useState<TicTacToeCell[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>('X')
  const [winner, setWinner] = useState<Winner>(null)
  const [gameMode, setGameMode] = useState<AIGameDifficulty>('easy')
  const [score, setScore] = useState({ player: 0, ai: 0, ties: 0 })
  const [isAiThinking, setIsAiThinking] = useState(false)

  const checkWinner = (currentBoard: TicTacToeCell[]): Winner => {
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

  const getAiMove = (
    currentBoard: TicTacToeCell[],
    difficulty: AIGameDifficulty,
  ): number => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const emptyCells = currentBoard
      .map((cell, index) => (cell === null ? index : null))
      .filter((val) => val !== null) as number[]

    if (difficulty === 'easy') {
      // Random move
      return emptyCells[Math.floor(Math.random() * emptyCells.length)]
    }

    if (difficulty === 'medium') {
      // 70% chance of optimal move, 30% random
      if (Math.random() < 0.7) {
        return getBestMove(currentBoard)
      }
      return emptyCells[Math.floor(Math.random() * emptyCells.length)]
    }

    // Hard mode - always optimal
    return getBestMove(currentBoard)
  }

  const getBestMove = (currentBoard: TicTacToeCell[]): number => {
    // Check if AI can win
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const testBoard = [...currentBoard]
        testBoard[i] = 'O'
        if (checkWinner(testBoard) === 'O') {
          return i
        }
      }
    }

    // Check if AI needs to block player
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const testBoard = [...currentBoard]
        testBoard[i] = 'X'
        if (checkWinner(testBoard) === 'X') {
          return i
        }
      }
    }

    // Take center if available
    if (currentBoard[4] === null) return 4

    // Take corners
    const corners = [0, 2, 6, 8]
    const availableCorners = corners.filter((i) => currentBoard[i] === null)
    if (availableCorners.length > 0) {
      return availableCorners[
        Math.floor(Math.random() * availableCorners.length)
      ]
    }

    // Take any available spot
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const emptyCells = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((val) => val !== null) as number[]
    return emptyCells[Math.floor(Math.random() * emptyCells.length)]
  }

  const handleCellClick = (index: number) => {
    if (board[index] || winner || currentPlayer === 'O' || isAiThinking) return

    const newBoard = [...board]
    newBoard[index] = 'X'
    setBoard(newBoard)
    setCurrentPlayer('O')

    const gameResult = checkWinner(newBoard)
    if (gameResult) {
      setWinner(gameResult)
      updateScore(gameResult)
      return
    }

    // AI move
    setIsAiThinking(true)
    setTimeout(
      () => {
        const aiMove = getAiMove(newBoard, gameMode)
        const aiBoard = [...newBoard]
        aiBoard[aiMove] = 'O'
        setBoard(aiBoard)
        setCurrentPlayer('X')
        setIsAiThinking(false)

        const aiGameResult = checkWinner(aiBoard)
        if (aiGameResult) {
          setWinner(aiGameResult)
          updateScore(aiGameResult)
        }
      },
      500 + Math.random() * 1000,
    )
  }

  const updateScore = (result: TicTacToeCell | 'tie') => {
    setScore((prev) => ({
      ...prev,
      player: result === 'X' ? prev.player + 1 : prev.player,
      ai: result === 'O' ? prev.ai + 1 : prev.ai,
      ties: result === 'tie' ? prev.ties + 1 : prev.ties,
    }))
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setWinner(null)
    setIsAiThinking(false)
  }

  const resetScore = () => {
    setScore({ player: 0, ai: 0, ties: 0 })
    resetGame()
  }

  return {
    board,
    currentPlayer,
    winner,
    score,
    isAiThinking,
    gameMode,
    setGameMode,
    handleCellClick,
    resetGame,
    resetScore,
  }
}
