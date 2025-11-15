import type { Variants } from 'motion/react'
import { CHECKERS_BOARD_SIZE } from '@/games/checkers/checkers.constant'

export const boardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
    },
  },
}

export const borderVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 1,
        ease: 'easeInOut',
      },
      opacity: { duration: 0.2 },
    },
  },
}

export const animationLayerVariants: Variants = {
  hidden: { opacity: 0 },
  show: (delay: number) => ({
    opacity: 1,
    transition: { delay, duration: 0.25, when: 'beforeChildren' },
  }),
}

export const rowsGridLineVariant: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: ({ idx }: { idx: number }) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.15,
      delay: 1 + idx * 0.1,
      ease: 'easeInOut',
    },
  }),
}

export const colsGridLineVariant: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: ({ idx }: { idx: number }) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.15,
      delay: 2 + idx * 0.1,
      ease: 'easeInOut',
    },
  }),
}

export const cellColorVariants: Variants = {
  hidden: {
    opacity: 0,
    scaleX: 0,
    transformOrigin: 'left center',
  },
  show: ({ idx }: { idx: number }) => ({
    opacity: 1,
    scaleX: 1,
    transformOrigin: 'left center',
    transition: {
      duration: 0.1,
      delay: 3 + 0.05 * idx,
      ease: 'circInOut',
    },
  }),
}

export const cellVariants: Variants = {
  hidden: {
    opacity: 0,
    transformOrigin: 'left center',
  },
  show: ({ idx }: { idx: number }) => ({
    opacity: 1,
    transformOrigin: 'left center',
    transition: {
      duration: 0.1,
      delay: 6.2 + 0.05 * idx,
      ease: 'circInOut',
    },
  }),
}

export const pieceVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: -10 },
  show: (i: number) => ({
    opacity: 1,
    scale: 0.9,
    y: 0,
    transition: {
      delay: 7 + 0.05 * i,
      duration: 0.25,
      type: 'spring',
      stiffness: 150,
    },
  }),
}
