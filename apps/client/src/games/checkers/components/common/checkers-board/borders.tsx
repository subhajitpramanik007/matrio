import { AnimatePresence, motion } from 'motion/react'
import {
  borderVariants,
  gridLineVariant,
  useCheckersBoardAnimation,
} from '@/games/checkers/components/common/checkers-board'
import { CHECKERS_BOARD_SIZE } from '@/games/checkers/checkers.constant'

export const CheckersBoardBorder: React.FC = () => {
  const { onAnimationDone } = useCheckersBoardAnimation()

  return (
    <motion.svg
      className="pointer-events-none absolute inset-0 z-20"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
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
        onAnimationComplete={() => onAnimationDone('border')}
      />
    </motion.svg>
  )
}

export const CheckersBoardRowsBorder: React.FC = () => {
  const { isBoardAnimationDone, onAnimationDone } = useCheckersBoardAnimation()

  return (
    <AnimatePresence>
      {isBoardAnimationDone ? (
        <motion.svg
          className="pointer-events-none absolute inset-0 z-20"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {Array.from({ length: CHECKERS_BOARD_SIZE - 1 }).map((_, i) => (
            <motion.line
              key={`h-${i}`}
              custom={i}
              x1="0"
              x2="100"
              y1={((i + 1) * 100) / CHECKERS_BOARD_SIZE}
              y2={((i + 1) * 100) / CHECKERS_BOARD_SIZE}
              stroke="black"
              strokeWidth="0.25"
              strokeDasharray="1"
              variants={gridLineVariant}
              initial="hidden"
              animate="show"
              onAnimationComplete={() => {
                if (i === CHECKERS_BOARD_SIZE - 2) onAnimationDone('rows')
              }}
            />
          ))}
        </motion.svg>
      ) : null}
    </AnimatePresence>
  )
}

export const CheckersBoardColsBorder: React.FC = () => {
  const { isBoardRowsAnimationDone, onAnimationDone } =
    useCheckersBoardAnimation()

  return (
    <AnimatePresence>
      {isBoardRowsAnimationDone ? (
        <motion.svg
          className="pointer-events-none absolute inset-0 z-20"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {Array.from({ length: CHECKERS_BOARD_SIZE - 1 }).map((_, i) => (
            <motion.line
              key={`v-${i}`}
              custom={i}
              x1={((i + 1) * 100) / CHECKERS_BOARD_SIZE}
              x2={((i + 1) * 100) / CHECKERS_BOARD_SIZE}
              y1="0"
              y2="100"
              stroke="black"
              strokeWidth="0.25"
              strokeDasharray="1"
              variants={gridLineVariant}
              initial="hidden"
              animate="show"
              onAnimationComplete={() => {
                if (i === CHECKERS_BOARD_SIZE - 2) onAnimationDone('cols')
              }}
            />
          ))}
        </motion.svg>
      ) : null}
    </AnimatePresence>
  )
}
