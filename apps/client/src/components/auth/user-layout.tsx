import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import { USER_TYPE } from '@/types'

import { useAuth } from '@/hooks/auth'

interface UserLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
  asChild?: boolean
}

export const UserLayout: React.FC<UserLayoutProps> = ({
  children,
  className,
  asChild = false,
  ...props
}) => {
  const { userType, status } = useAuth()

  if (userType === USER_TYPE.GUEST || status === 'loading') return null

  if (asChild) {
    return <>{children}</>
  }

  return (
    <div data-slot="user-layout" className={cn(className)} {...props}>
      {children}
    </div>
  )
}
