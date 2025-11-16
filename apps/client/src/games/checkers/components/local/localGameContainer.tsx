import * as React from 'react'
import { CheckersBoard } from '../common/checkersBoard'
import { CheckersScorecard } from '@/games/checkers/components/common/scorecard'
import { useCheckersLocalGame } from '@/games/checkers/hooks'

const LocalGameContainer: React.FC = () => {
  const { board, currentPlayerColor, result, handleClickToCell } = useCheckersLocalGame()

  return (
    <div className="mx-4 flex flex-col justify-center gap-4 md:flex-row">
      <CheckersBoard board={board} onClick={handleClickToCell} />
      <CheckersScorecard result={result} currentPlayerColor={currentPlayerColor} />
    </div>
  )
}

export default LocalGameContainer
