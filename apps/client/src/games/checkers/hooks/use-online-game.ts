import { useEffect, useState } from 'react'
import { useCheckersOnlineGameData } from '../components/online-game/online-game'
import { checkersMove } from '../checkers.utils'
import type { TCheckersBoard } from '@matrio/shared/checkers/types'

export const useCheckersOnlineGame = () => {
  const {
    room: { board, players, settings, state, turn },
  } = useCheckersOnlineGameData()

  const [localBoard, setLocalBoard] = useState<TCheckersBoard>(board)

  const handleClickToCell = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('Clicked')
    const target = e.target as HTMLElement
    const cellEl = target.closest('[data-cell]')
    if (!cellEl) return

    const position = cellEl
      .getAttribute('data-cell')!
      .replace('cell-', '')
      .split('-')
      .map(Number) as any

    const currentPlayerColor = players.find((p) => p.id === turn)?.pieceColor
    const [newBoard, moveMade] = checkersMove(board, currentPlayerColor!, position)

    setLocalBoard(newBoard)

    if (moveMade) {
      console.log('Move made')
    }
  }

  useEffect(() => {
    console.log('board')
    // setLocalBoard(board)
  }, [board])

  return {
    board: localBoard,
    handleClickToCell,
    players,
    settings,
    state,
    turn,
  }
}
