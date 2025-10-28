import * as React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

type HoverMotionProps = React.ComponentProps<typeof motion.div> & {
  idx: number
  currentIdx: number | null
  layoutId: string
}

export const HoverMotion: React.FC<HoverMotionProps> = ({
  idx,
  currentIdx,
  className,
  layoutId,
  ...props
}) => {
  return (
    <AnimatePresence>
      {currentIdx === idx && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'round-md absolute top-0 left-0 z-10 h-full w-full rounded-md bg-white/20',
            className,
          )}
          layoutId={layoutId}
          {...props}
        />
      )}
    </AnimatePresence>
  )
}
