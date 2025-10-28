import * as React from 'react'

export const DisplayThis: React.FC<{
  when: boolean
  children: React.ReactNode
  fallback?: React.ReactNode | null
}> = ({ when, children, fallback = null }) => {
  return when ? <>{children}</> : <>{fallback}</>
}
