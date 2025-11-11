import * as React from 'react'
import { motion } from 'motion/react'
import type { TCheckersBoard } from '@/games/checkers/checkers.types'
import {
  CheckersBoardAnimationProvider,
  CheckersBoardBorder,
  CheckersBoardCells,
  CheckersBoardColsBorder,
  CheckersBoardRowsBorder,
  CheckersPieces,
  boardVariants,
} from '@/games/checkers/components/common/checkers-board'

export const CheckersBoard: React.FC<{ board: TCheckersBoard }> = ({
  board,
}) => {
  return (
    <CheckersBoardAnimationProvider>
      <CheckersBoardComponent board={board} />
    </CheckersBoardAnimationProvider>
  )
}

const CheckersBoardComponent: React.FC<{ board: TCheckersBoard }> = ({
  board,
}) => {
  return (
    <motion.div
      className="relative grid h-full w-full"
      variants={boardVariants}
      initial="hidden"
      animate="show"
    >
      <CheckersBoardBorder />
      <CheckersBoardRowsBorder />
      <CheckersBoardColsBorder />
      <CheckersBoardCells board={board} />
      <CheckersPieces board={board} />
    </motion.div>
  )
}
