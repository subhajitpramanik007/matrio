import * as React from 'react'
import type { ChildrenProps } from '@/types'

export const HeaderContainer: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/40 sticky top-0 z-50 border-b px-8 backdrop-blur">
      <div className="container mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
        {children}
      </div>
    </header>
  )
}
