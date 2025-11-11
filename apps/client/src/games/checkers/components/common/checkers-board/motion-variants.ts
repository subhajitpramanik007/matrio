import type { Variants } from 'motion/react'

export const boardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, when: 'beforeChildren' },
  },
}

export const borderVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1, ease: 'easeInOut' },
      opacity: { duration: 0.2 },
    },
  },
}

export const gridLineVariant: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.25,
      delay: delay * 0.1,
      ease: 'easeInOut',
    },
  }),
}

const transformOrigin: Record<string, string> = {
  top: 'top center',
  bottom: 'bottom center',
  left: 'center left',
  right: 'center right',
}

export const cellVariants: Variants = {
  hidden: {
    opacity: 0,
    scaleX: 0,
    transformOrigin: 'left center',
  },
  show: (i: number) => ({
    opacity: 1,
    scaleX: 1,
    transformOrigin: 'left center',
    transition: {
      delay: 0.05 * i,
      duration: 0.1,
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
      delay: 0.05 * i,
      duration: 0.25,
      type: 'spring',
      stiffness: 150,
    },
  }),
}
