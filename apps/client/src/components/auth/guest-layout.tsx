import * as React from 'react'
import { useAuth } from '@/hooks/auth'
import { USER_TYPE } from '@/types'
import { cn } from '@/lib/utils'

interface GuestLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
  asChild?: boolean
}

export const GuestLayout: React.FC<GuestLayoutProps> = ({
  children,
  className,
  asChild = false,
  ...props
}) => {
  const { userType, status } = useAuth()

  if (userType === USER_TYPE.USER || status === 'loading') return null

  if (asChild) {
    return <>{children}</>
  }

  return (
    <div data-slot="guest-layout" className={cn('', className)} {...props}>
      {children}
    </div>
  )
}
