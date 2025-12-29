import { createFileRoute } from '@tanstack/react-router'

import { slugToTitle } from '@/lib/utils'
import { gameParamSchema } from '@/games/common/game.schema'
import { SingleGameLayout } from '@/games/common/components/SingleGameLayout'
import { GameSettingsStateProvider } from '@/games/common/contexts/GameSettingsContext'

export const Route = createFileRoute('/games/$game')({
  component: RouteComponent,
  loader: ({ params }) => {
    const { success, data } = gameParamSchema.safeParse(params)
    if (!success) throw new Error('Invalid game slug')
    return { gameSlug: data.game, game: slugToTitle(data.game) }
  },
})

function RouteComponent() {
  return <SingleGameLayout GameSettings={GameSettingsStateProvider} />
}
