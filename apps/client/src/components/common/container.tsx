import { motion } from 'motion/react'
import type { ChildrenProps } from '@/types/children.type'
import { cn } from '@/lib/utils'

interface ContainerProps extends ChildrenProps {
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('container mx-auto w-full', className)}
    >
      {children}
    </motion.div>
  )
}
