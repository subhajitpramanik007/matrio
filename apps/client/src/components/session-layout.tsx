import * as React from 'react'

import { motion } from 'motion/react'
import type { ChildrenProps } from '@/types'
import { ErrorPage } from '@/components/error'
import { LoadingScreen } from '@/components/loading-screen'
import { useAuth } from '@/hooks/auth'

export const SessionLayout: React.FC<ChildrenProps> = ({ children }) => {
  const { status } = useAuth()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {status === 'loading' ? (
        <LoadingScreen />
      ) : status === 'authenticated' ? (
        children
      ) : (
        <ErrorPage />
      )}
    </motion.div>
  )
}
