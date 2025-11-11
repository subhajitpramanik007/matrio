import { AnimatePresence, motion } from 'motion/react'
import type React from 'react'
import type {
  TCheckersBoard,
  TCheckersCell,
} from '@/games/checkers/checkers.types'
import { CHECKERS_BOARD_SIZE } from '@/games/checkers/checkers.constant'
import {
  cellVariants,
  useCheckersBoardAnimation,
} from '@/games/checkers/components/common/checkers-board'
import { cn } from '@/lib/utils'

export const CheckersBoardCells: React.FC<{ board: TCheckersBoard }> = ({
  board,
}) => {
  const { isBoardColsAnimationDone } = useCheckersBoardAnimation()

  return (
    <AnimatePresence>
      {isBoardColsAnimationDone ? (
        <motion.div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {board.flatMap((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <CheckersCell
                key={`cell-${rowIndex}-${colIndex}`}
                {...cell}
                rowIndex={rowIndex}
                colIndex={colIndex}
              />
            )),
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

const CheckersCell: React.FC<
  React.ComponentProps<typeof motion.div> &
    TCheckersCell & {
      rowIndex: number
      colIndex: number
    }
> = ({ isDark, colIndex, rowIndex }) => {
  const { onAnimationDone } = useCheckersBoardAnimation()

  return (
    <motion.div
      custom={rowIndex * CHECKERS_BOARD_SIZE + colIndex}
      variants={cellVariants}
      initial="hidden"
      animate="show"
      className={cn(
        'flex aspect-square items-center justify-center',
        isDark ? 'bg-gray-800' : 'bg-amber-100',
      )}
      data-cell={`cell-${rowIndex}-${colIndex}`}
      onAnimationComplete={() => {
        if (rowIndex === 7 && colIndex === 7) onAnimationDone('cells')
      }}
    />
  )
}
