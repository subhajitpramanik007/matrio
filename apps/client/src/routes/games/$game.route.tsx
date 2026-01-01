import { createFileRoute } from '@tanstack/react-router'

import { gameParamSchema } from '@/games/common/game.schema'
import { SingleGameLayout } from '@/games/common/components/SingleGameLayout'
import { GameSettingsStateProvider } from '@/games/common/contexts/GameSettingsContext'

function validateGameSlug(params: unknown) {
  const { success, data, error } = gameParamSchema.safeParse(params)
  if (!success) {
    const issues = error.issues.map((issue) => issue.path)
    if (issues.some((issue) => issue[0] === 'game')) throw new Error('Invalid game slug')
    throw new Error('Invalid game slug')
  }
  return { gameSlug: data.game }
}

export const Route = createFileRoute('/games/$game')({
  component: RouteComponent,
  loader: ({ params }) => validateGameSlug(params),
})

function RouteComponent() {
  return <SingleGameLayout GameSettings={GameSettingsStateProvider} />
}
