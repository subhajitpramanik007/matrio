import * as React from 'react'
import { CheckersBoard } from '../common/checkersBoard'
import { useCheckersOnlineGame } from '../../hooks'

interface playgroundProps {}

export const CheckersOnlinePlayground: React.FC<playgroundProps> = () => {
  const { board, handleClickToCell } = useCheckersOnlineGame()

  return (
    <div>
      <CheckersBoard board={board} onClick={handleClickToCell} />
    </div>
  )
}
