import { AnimatePresence, motion } from 'motion/react'
import type {
  TCheckersBoard,
  TCheckersPiece,
} from '@/games/checkers/checkers.types'

import { cn } from '@/lib/utils'
import {
  CheckersKingIcon,
  pieceVariants,
  useCheckersBoardAnimation,
} from '@/games/checkers/components/common/checkers-board'

export const CheckersPieces: React.FC<{
  board: TCheckersBoard
}> = ({ board }) => {
  const { isBoardCellsAnimationDone } = useCheckersBoardAnimation()

  return (
    <AnimatePresence>
      {isBoardCellsAnimationDone ? (
        <motion.div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {board.flatMap((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <motion.div
                key={`cell-${rowIndex}-${colIndex}`}
                className={cn(
                  'flex items-center justify-center bg-white hover:opacity-90',
                  cell.isDark && 'bg-gray-800',
                )}
              >
                {cell.piece && (
                  <CheckersPiece
                    key={cell.piece.id}
                    piece={cell.piece}
                    index={rowIndex * 8 + colIndex}
                  />
                )}
              </motion.div>
            )),
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export const CheckersPiece: React.FC<{
  piece: TCheckersPiece
  index: number
}> = ({ piece: { color, isKing }, index }) => {
  return (
    <motion.div
      custom={index}
      variants={pieceVariants}
      initial="hidden"
      animate="show"
      className={cn(
        'relative z-50 aspect-square w-full skew-y-1 rounded-full border-4 bg-radial-[at_50%_75%] p-1',
        color === 'red' && 'border-red-800 from-red-400 to-red-800',
        color === 'black' && 'border-gray-900 from-gray-400 to-gray-900',
        'hover:scale-[1.02] hover:cursor-pointer hover:opacity-100',
      )}
    >
      {isKing && (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white">
          <CheckersKingIcon
            className={cn(
              color === 'red' && 'text-red-800',
              color === 'black' && 'text-gray-900',
            )}
          />
        </span>
      )}
    </motion.div>
  )
}
