'use client'

import * as React from 'react'
import { ModeToggle } from '@/components/header/mode-toggle'
import { AppLogo } from '@/components/common/app-logo'
import { SignupButton } from '@/components/header/signup-button'

export const Header: React.FC = () => {
  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/40 sticky top-0 z-50 border-b px-8 backdrop-blur">
      <div className="container mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
        <div className="flex h-full items-center justify-center">
          <AppLogo className="mb-0" />
        </div>
        <div className="mx-auto w-full">{/* <GameName /> */}</div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-4">
            <ModeToggle />
            <SignupButton />
          </div>
          {/* <ThemeToggle />
          <UnauthorizedLayout>
          </UnauthorizedLayout>
          <AuthorizedLayout className="flex gap-4">
            <ShowCoins coins={user?.coins || 0} />
            <UserButton user={user} />
          </AuthorizedLayout> */}
        </div>
      </div>
    </header>
  )
}
