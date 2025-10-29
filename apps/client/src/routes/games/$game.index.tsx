import { createFileRoute } from '@tanstack/react-router'

import { GameSettings } from '@/games/components/game-settings'

export const Route = createFileRoute('/games/$game/')({
  component: GameSettings,
})
