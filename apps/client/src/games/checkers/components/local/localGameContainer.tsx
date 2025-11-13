import * as React from 'react'
import { motion } from 'motion/react'
import { initialCheckersBoard } from '../../checkers.utils'
import {
  animationLayerVariants,
  borderVariants,
  cellVariants,
  gridLineVariant,
} from '../common/checkers-board'
import { CHECKERS_BOARD_SIZE } from '../../checkers.constant'
import type { TCheckersBoard, TCheckersPieceColor } from '../../checkers.types'
import { cn } from '@/lib/utils'

type LocalGameState = {
  board: TCheckersBoard
  currentPlayerColor: TCheckersPieceColor
}

const INIT_CHECKERS_BOARD: TCheckersBoard = initialCheckersBoard()

function reducer(
  state: LocalGameState,
  action:
    | { type: 'SET_BOARD'; payload: TCheckersBoard }
    | { type: 'SET_CURRENT_PLAYER_COLOR'; payload: TCheckersPieceColor }
    | { type: 'RESET' },
) {
  switch (action.type) {
    case 'SET_BOARD':
      return { ...state, board: action.payload }
    case 'SET_CURRENT_PLAYER_COLOR':
      return { ...state, currentPlayerColor: action.payload }
    case 'RESET':
      return { ...state, board: INIT_CHECKERS_BOARD }
    default:
      return state
  }
}

const INIT_LOCAL_GAME_STATE: LocalGameState = {
  board: INIT_CHECKERS_BOARD,
  currentPlayerColor: 'red',
}

const LocalGameContainer: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, INIT_LOCAL_GAME_STATE)

  React.useEffect(() => {
    dispatch({ type: 'RESET' })
  }, [])

  return (
    <CheckersBoardLayer>
      <CheckersBoardAnimationLayer className="z-10 bg-transparent">
        <CheckersBoardBorder />
      </CheckersBoardAnimationLayer>
      <CheckersBoardAnimationLayer className="z-10 bg-transparent">
        <CheckersBoardRowsBorder />
      </CheckersBoardAnimationLayer>
      <CheckersBoardAnimationLayer className="z-10 bg-transparent">
        <CheckersBoardColsBorder />
      </CheckersBoardAnimationLayer>

      <CheckersBoardAnimationLayer className="">
        <CheckersBoardCellsLayer board={state.board} />
      </CheckersBoardAnimationLayer>

      {/* <CheckersBoardDisplay /> */}
    </CheckersBoardLayer>
  )
}

/* ------------------- Components ------------------- */

const DELAY_OFF_ROWS_BORDER = 1
const DELAY_OFF_COLS_BORDER = 3
const DELAY_OFF_CELLS_COLOR = 5

const CheckersBoardCellsLayer: React.FC<{ board: TCheckersBoard }> = ({ board }) => {
  return (
    <div className="-z-10 grid grid-cols-8 grid-rows-8">
      {board.flatMap((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <CheckersBoardCellColor
            key={`cell-${rowIndex}-${colIndex}`}
            flatIndex={rowIndex * CHECKERS_BOARD_SIZE + colIndex}
            isDark={cell.isDark}
          />
        )),
      )}
    </div>
  )
}

const CheckersBoardCellColor: React.FC<
  React.ComponentProps<typeof motion.div> & { flatIndex: number; isDark: boolean }
> = ({ className, flatIndex: idx, isDark, ...props }) => (
  <motion.div
    data-slot="checkers-board-cell-color"
    custom={{ delay: DELAY_OFF_CELLS_COLOR, idx }}
    variants={cellVariants}
    initial="hidden"
    animate="show"
    className={cn('flex aspect-square', isDark ? 'bg-gray-800' : 'bg-amber-100', className)}
    {...props}
  />
)

const CheckersBoardColsBorder: React.FC = () => {
  return (
    <CheckersBoardSvgLayer>
      {Array.from({ length: CHECKERS_BOARD_SIZE - 1 }).map((_, idx) => (
        <CheckersBoardGridLines
          key={`cols-border-${idx}`}
          custom={{ idx, delay: DELAY_OFF_COLS_BORDER }}
          x1={((idx + 1) * 100) / CHECKERS_BOARD_SIZE}
          x2={((idx + 1) * 100) / CHECKERS_BOARD_SIZE}
          y1="0"
          y2="100"
        />
      ))}
    </CheckersBoardSvgLayer>
  )
}

export const CheckersBoardRowsBorder: React.FC = () => {
  return (
    <CheckersBoardSvgLayer>
      {Array.from({ length: CHECKERS_BOARD_SIZE - 1 }).map((_, idx) => (
        <CheckersBoardGridLines
          key={`rows-border-${idx}`}
          custom={{ idx, delay: DELAY_OFF_ROWS_BORDER }}
          x1="0"
          x2="100"
          y1={((idx + 1) * 100) / CHECKERS_BOARD_SIZE}
          y2={((idx + 1) * 100) / CHECKERS_BOARD_SIZE}
        />
      ))}
    </CheckersBoardSvgLayer>
  )
}

const CheckersBoardGridLines: React.FC<React.ComponentProps<typeof motion.line>> = ({
  className,
  ...props
}) => {
  return (
    <motion.line
      data-slot="checkers-board-grid-line"
      className={cn('stroke-black', className)}
      strokeWidth="0.25"
      strokeDasharray="1"
      variants={gridLineVariant}
      initial="hidden"
      animate="show"
      {...props}
    />
  )
}

const CheckersBoardBorder: React.FC<React.ComponentProps<typeof motion.rect>> = ({
  className,
  ...props
}) => (
  <CheckersBoardSvgLayer>
    <motion.rect
      width="100"
      height="100"
      strokeWidth="0.8"
      fill="transparent"
      strokeDasharray="1"
      variants={borderVariants}
      initial="hidden"
      animate="show"
      className="stroke-black"
      {...props}
    />
  </CheckersBoardSvgLayer>
)

const CheckersBoardSvgLayer: React.FC<React.ComponentProps<typeof motion.svg>> = ({
  className,
  ...props
}) => (
  <motion.svg
    data-slot="checkers-board-svg-layer"
    className={cn('pointer-events-none bg-transparent', className)}
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    {...props}
  />
)

const CheckersBoardAnimationLayer: React.FC<React.ComponentProps<typeof motion.div>> = ({
  className,
  ...props
}) => (
  <motion.div
    data-slot="checkers-board-layer"
    className={cn('pointer-events-none absolute inset-0 h-full w-full p-2', className)}
    variants={animationLayerVariants}
    initial="hidden"
    animate="show"
    {...props}
  />
)

const CheckersBoardLayer: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div
    data-slot="checkers-board-layer"
    className={cn(
      'mx-auto aspect-square w-full max-w-[600px]',
      'relative overflow-hidden rounded-xs p-2',
      'bg-yellow-600 bg-[url("/wood.jpg")] bg-cover bg-center bg-repeat bg-blend-multiply',
      className,
    )}
    {...props}
  />
)

export default LocalGameContainer
