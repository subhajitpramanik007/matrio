import React from 'react'
import { motion } from 'motion/react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function GameSettingOptionsTitle({
  className,
  ...props
}: React.ComponentProps<'h1'>) {
  return (
    <h1
      className={cn(
        'text-primary/70 w-full pb-8 text-center text-xl font-semibold underline',
        className,
      )}
      {...props}
    />
  )
}

function GameSettingOptionsButton({
  isSelected,
  ...props
}: React.ComponentProps<typeof motion.button> & {
  isSelected?: boolean
}) {
  return (
    <motion.button
      className={cn(
        isSelected
          ? buttonVariants({ variant: 'default' })
          : buttonVariants({ variant: 'outline' }),
      )}
      {...props}
    />
  )
}

function GameSettingOptions({
  className,
  ...props
}: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      {...props}
      className={cn('flex justify-center gap-4', className)}
    />
  )
}

function GameSettingOptionsSection({
  className,
  ...props
}: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      {...props}
      className={cn(
        'flex w-full max-w-3xl flex-col items-center justify-center',
        className,
      )}
    />
  )
}

function GameSettingOptionsWrapper({
  className,
  ...props
}: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      {...props}
      className={cn(
        'flex w-full flex-col items-center justify-center',
        className,
      )}
    />
  )
}

export {
  GameSettingOptionsTitle,
  GameSettingOptionsButton,
  GameSettingOptions,
  GameSettingOptionsSection,
  GameSettingOptionsWrapper,
}
