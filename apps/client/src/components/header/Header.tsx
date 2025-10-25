'use client'

import * as React from 'react'
import { HeaderContainer } from './header-container'

import { ModeToggle } from '@/components/header/mode-toggle'
import { DisplayCoins } from '@/components/header/display-coins'
import { AppLogo } from '@/components/common/app-logo'
import { SignupButton } from '@/components/header/signup-button'
import { GuestLayout, UserLayout } from '@/components/auth'
import { useHeader } from '@/hooks/use-header'

const UserButton = React.lazy(() => import('./user-button'))

export const Header: React.FC = () => {
  const { title } = useHeader()

  return (
    <HeaderContainer>
      <div className="flex h-full items-center justify-center">
        <AppLogo className="mb-0" />
      </div>
      <div className="mx-auto w-full">
        <h1 className="text-center text-2xl font-bold tracking-wide capitalize">
          {title}
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <GuestLayout className="flex gap-4">
          <ModeToggle />
          <SignupButton />
        </GuestLayout>
        <UserLayout asChild>
          <DisplayCoins />
          <UserButton />
        </UserLayout>
      </div>
    </HeaderContainer>
  )
}
