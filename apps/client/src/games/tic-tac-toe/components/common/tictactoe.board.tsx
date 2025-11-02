import { AnimatePresence, motion } from 'motion/react'
import { RotateCcw } from 'lucide-react'
import type { TicTacToeSymbol } from '@/games/tic-tac-toe/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function TicTacToeBoard({
  board,
  handleCellClick,
  isDisabled,
  winningLine,
}: {
  board: (string | null)[]
  handleCellClick: (index: number) => void
  isDisabled: (idx: number) => boolean
  winningLine?: number[]
}) {
  return (
    <div className="mx-auto mb-6 grid max-w-80 grid-cols-3 gap-4">
      {board.map((cell, index) => (
        <motion.button
          key={index}
          className={cn(
            'border-border bg-card hover:bg-accent/10 flex aspect-square items-center justify-center rounded-lg border-2 text-4xl font-bold transition-colors disabled:cursor-not-allowed',
            winningLine?.includes(index) &&
              'ring-primary/50 shadow-primary/50 shadow-md ring-2',
          )}
          onClick={() => handleCellClick(index)}
          disabled={isDisabled(index)}
          whileHover={{ scale: cell ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence>
            {cell && (
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                className={cell === 'X' ? 'text-primary' : 'text-orange-500'}
              >
                {cell}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </div>
  )
}

export function TicTacToeBoardFooter({
  winner,
  resetGame,
}: {
  winner: TicTacToeSymbol | 'tie' | null
  resetGame: () => void
}) {
  return (
    <div className="flex w-full justify-center space-x-4">
      <Button onClick={resetGame} variant="outline">
        <RotateCcw className="mr-2 h-4 w-4" />
        New Game
      </Button>
      {winner && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button onClick={resetGame}>Play Again</Button>
        </motion.div>
      )}
    </div>
  )
}
