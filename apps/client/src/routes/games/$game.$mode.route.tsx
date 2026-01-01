import { Outlet, createFileRoute } from '@tanstack/react-router'

import { gameParamWithModeSchema } from '@/games/common/game.schema'
import { useCheckGameSettingsDone } from '@/games/common/hooks'
import { RoomDataContextProvider } from '@/games/common/contexts/RoomDataContext'

export const Route = createFileRoute('/games/$game/$mode')({
  component: RouteComponent,
  loader: ({ params }) => validateGameSlug(params),
})

function validateGameSlug(params: unknown) {
  const { success, data, error } = gameParamWithModeSchema.safeParse(params)
  if (!success) {
    const issues = error.issues.map((issue) => issue.path)

    const isInvalidGame = issues.some((issue) => issue[0] === 'game')
    const isInvalidMode = issues.some((issue) => issue[0] === 'mode')

    if (isInvalidGame) throw new Error('Invalid game slug')
    if (isInvalidMode) throw new Error('Invalid mode slug')

    throw new Error('Invalid game slug or mode slug')
  }
  return { gameSlug: data.game, mode: data.mode }
}

function RouteComponent() {
  useCheckGameSettingsDone()
  return (
    <RoomDataContextProvider>
      <Outlet />
    </RoomDataContextProvider>
  )
}
