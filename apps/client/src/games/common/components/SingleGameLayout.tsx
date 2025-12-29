import { Outlet } from '@tanstack/react-router'
import type { GameSettingsStateProvider } from '@/games/common/contexts'
import { GameSettingLayoutContextProvider } from '@/games/common/contexts'

import { Container } from '@/components/common/container'

type SingleGameLayoutProps = {
  GameSettings: typeof GameSettingsStateProvider
}

export const SingleGameLayout = ({ GameSettings }: SingleGameLayoutProps) => {
  return (
    <Container>
      <GameSettingLayoutContextProvider>
        <GameSettings>
          <Outlet />
        </GameSettings>
      </GameSettingLayoutContextProvider>
    </Container>
  )
}
