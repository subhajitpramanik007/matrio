import { Outlet, createFileRoute } from '@tanstack/react-router'
import { GameSettingsProvider } from '@/games/contexts/game-settings.context'
import { gameParamSchema } from '@/games/game.schema'

export const Route = createFileRoute('/games/$game')({
  component: RouteComponent,
  loader: ({ params }) => {
    const { success, data } = gameParamSchema.safeParse(params)
    if (!success) throw new Error('Invalid game slug')
    return { gameSlug: data.game }
  },
})

function RouteComponent() {
  return (
    <GameSettingsProvider>
      <Outlet />
    </GameSettingsProvider>
  )
}
