import { AnimatePresence, motion } from 'motion/react'
import {
  animationLayerVariants,
  boardVariants,
  borderVariants,
  cellColorVariants,
  cellVariants,
  colsGridLineVariant,
  pieceVariants,
  rowsGridLineVariant,
} from './motion-variants'
import type React from 'react'
import type { TCheckersCell } from '@/games/checkers/checkers.types'
import type { TCheckersBoard, TCheckersPiece } from '@matrio/shared/checkers/types'
import { CHECKERS_BOARD_SIZE } from '@/games/checkers/checkers.constant'
import { cn } from '@/lib/utils'
import { DisplayArray, DisplayArray2D, DisplayThis } from '@/components/display-this'

const CheckersBoard: React.FC<
  React.ComponentProps<typeof motion.div> & { board: TCheckersBoard }
> = ({ className, board, ...props }) => {
  return (
    // Background layer
    <CheckersBoardLayer>
      {/* Board border */}
      <CheckersBoardAnimationLayer
        data-slot="checkers-board-border-layer"
        className="z-10 bg-transparent"
      >
        <CheckersBoardBorder />
      </CheckersBoardAnimationLayer>

      {/* Grid lines of rows and columns */}
      <CheckersBoardAnimationLayer
        data-slot="checkers-board-rows-border-layer"
        className="z-10 bg-transparent"
      >
        <CheckersBoardRowsBorder />
      </CheckersBoardAnimationLayer>
      <CheckersBoardAnimationLayer
        data-slot="checkers-board-cols-border-layer"
        className="z-10 bg-transparent"
      >
        <CheckersBoardColsBorder />
      </CheckersBoardAnimationLayer>

      {/* Cells background color */}
      <CheckersBoardAnimationLayer data-slot="checkers-board-cells-layer">
        <CheckersBoardCellsLayer board={board} />
      </CheckersBoardAnimationLayer>

      {/* Cells with pieces */}
      <CheckersBoardAnimationLayer
        className="pointer-events-auto"
        data-slot="checkers-board-cells-with-pieces-layer"
      >
        <CheckersBoardCells board={board} {...props} />
      </CheckersBoardAnimationLayer>
    </CheckersBoardLayer>
  )
}

const CheckersBoardCells: React.FC<
  React.ComponentProps<typeof motion.div> & { board: TCheckersBoard }
> = ({ board, ...props }) => {
  return (
    <motion.div className="-z-10 grid grid-cols-8 grid-rows-8" {...props}>
      <DisplayArray2D
        data={board}
        render={(cell, rowIndex, colIndex) => (
          <CheckersBoardCell
            key={`cell-${rowIndex}-${colIndex}`}
            data-cell={`cell-${rowIndex}-${colIndex}`}
            flatIndex={rowIndex * CHECKERS_BOARD_SIZE + colIndex}
            cell={cell}
          >
            <AnimatePresence>
              <DisplayThis when={cell.piece}>
                {(piece) => <CheckersPiece data-piece={piece.id} piece={piece} />}
              </DisplayThis>
            </AnimatePresence>
          </CheckersBoardCell>
        )}
      />
    </motion.div>
  )
}

const CheckersBoardCell: React.FC<
  React.ComponentProps<typeof motion.div> & { cell: TCheckersCell; flatIndex: number }
> = ({ className, cell, flatIndex: idx, ...props }) => {
  return (
    <motion.div
      data-slot="checkers-board-cell"
      custom={{ idx }}
      className={cn(
        'z-20 flex aspect-square h-full w-full items-center justify-center p-1',
        className,
      )}
      variants={cellVariants}
      initial="hidden"
      animate="show"
      {...props}
    />
  )
}

const CheckersPiece: React.FC<
  React.ComponentProps<typeof motion.div> & { piece: TCheckersPiece }
> = (props) => {
  const {
    piece: { id, isKing, color },
    ...rest
  } = props

  const DisplayKing = () =>
    isKing ? (
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white">
        <CheckersKingIcon
          className={cn(color === 'red' && 'text-red-800', color === 'black' && 'text-gray-900')}
        />
      </span>
    ) : null

  const className = cn(
    'relative z-50 aspect-square w-full skew-y-1 rounded-full border-4 bg-radial-[at_50%_75%] p-1',
    color === 'red' && 'border-red-800 from-red-400 to-red-800',
    color === 'black' && 'border-gray-900 from-gray-400 to-gray-900',
    'hover:scale-[1.02] hover:cursor-pointer hover:opacity-100',
    props.className,
  )

  return (
    <motion.div
      layoutId={id}
      data-slot="checkers-piece"
      variants={pieceVariants}
      initial="hidden"
      animate="show"
      className={className}
      {...rest}
    >
      <DisplayKing />
    </motion.div>
  )
}

export const CheckersKingIcon: React.FC<React.ComponentProps<'svg'>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('lucide lucide-chess-king-icon lucide-chess-king', className)}
      {...props}
    >
      <path d="M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      <path d="m6.7 18-1-1C4.35 15.682 3 14.09 3 12a5 5 0 0 1 4.95-5c1.584 0 2.7.455 4.05 1.818C13.35 7.455 14.466 7 16.05 7A5 5 0 0 1 21 12c0 2.082-1.359 3.673-2.7 5l-1 1" />
      <path d="M10 4h4" />
      <path d="M12 2v6.818" />
    </svg>
  )
}

const CheckersBoardCellsLayer: React.FC<{ board: TCheckersBoard }> = ({ board }) => {
  return (
    <div className="-z-10 grid grid-cols-8 grid-rows-8">
      <DisplayArray2D
        data={board}
        render={(cell, rowIndex, colIndex) => (
          <CheckersBoardCellColor
            key={`cell-${rowIndex}-${colIndex}`}
            flatIndex={rowIndex * CHECKERS_BOARD_SIZE + colIndex}
            cell={cell}
          />
        )}
      />
    </div>
  )
}

const CheckersBoardCellColor: React.FC<
  React.ComponentProps<typeof motion.div> & { cell: TCheckersCell; flatIndex: number }
> = ({ className, flatIndex: idx, cell, ...props }) => (
  <motion.div
    data-slot="checkers-board-cell-color"
    custom={{ idx }}
    variants={cellColorVariants}
    initial="hidden"
    animate="show"
    className={cn(
      'flex aspect-square',
      cell.isDark ? 'bg-gray-800' : 'bg-amber-100',
      cell.highlightType === 'selected_cell' && 'bg-blue-400',
      cell.highlightType === 'possible_move' && 'bg-emerald-500',
      cell.highlightType === 'possible_capture' && 'bg-rose-500',
      className,
    )}
    {...props}
  />
)

const CheckersBoardColsBorder: React.FC = () => {
  return (
    <CheckersBoardSvgLayer>
      <DisplayArray
        data={Array.from({ length: CHECKERS_BOARD_SIZE - 1 })}
        render={(_, idx) => (
          <CheckersBoardGridLines
            key={`cols-border-${idx}`}
            custom={{ idx }}
            x1={((idx + 1) * 100) / CHECKERS_BOARD_SIZE}
            x2={((idx + 1) * 100) / CHECKERS_BOARD_SIZE}
            y1="0"
            y2="100"
            variants={colsGridLineVariant}
          />
        )}
      />
    </CheckersBoardSvgLayer>
  )
}

export const CheckersBoardRowsBorder: React.FC = () => {
  return (
    <CheckersBoardSvgLayer>
      <DisplayArray
        data={Array.from({ length: CHECKERS_BOARD_SIZE - 1 })}
        render={(_, idx) => (
          <CheckersBoardGridLines
            key={`rows-border-${idx}`}
            custom={{ idx }}
            x1="0"
            x2="100"
            y1={((idx + 1) * 100) / CHECKERS_BOARD_SIZE}
            y2={((idx + 1) * 100) / CHECKERS_BOARD_SIZE}
            variants={rowsGridLineVariant}
          />
        )}
      />
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
    data-slot="checkers-board-each-animation-layer"
    className={cn('pointer-events-none absolute inset-0 h-full w-full p-2', className)}
    variants={animationLayerVariants}
    initial="hidden"
    animate="show"
    {...props}
  />
)

const CheckersBoardLayer: React.FC<React.ComponentProps<typeof motion.div>> = ({
  className,
  ...props
}) => (
  <motion.div
    data-slot="checkers-board-layer"
    className={cn(
      'mx-auto aspect-square w-full max-w-[600px]',
      'relative overflow-hidden rounded-xs p-2',
      'bg-yellow-600 bg-[url("/wood.jpg")] bg-cover bg-center bg-repeat bg-blend-multiply',
      className,
    )}
    variants={boardVariants}
    initial="hidden"
    animate="show"
    {...props}
  />
)

export {
  CheckersBoard,
  CheckersBoardAnimationLayer,
  CheckersBoardLayer,
  CheckersBoardSvgLayer,
  CheckersBoardBorder,
  CheckersBoardCellColor,
  CheckersBoardColsBorder,
  CheckersBoardCellsLayer,
  CheckersBoardGridLines,
}
