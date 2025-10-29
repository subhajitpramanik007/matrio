import { createFileRoute } from '@tanstack/react-router'

import { ErrorPage } from '@/components/error'
import { GamePlay } from '@/games/components/game-play'

import { gameModeParamSchema } from '@/games/game.schema'

export const Route = createFileRoute('/games/$game/$mode')({
  component: GamePlay,
  loader: ({ params }) => {
    const { success, data, error } = gameModeParamSchema.safeParse(params)

    if (!success) {
      const issues = error.issues.map((issue) => issue.path)
      const isInvalidGame = issues.some((issue) => issue[0] === 'game')
      const isInvalidMode = issues.some((issue) => issue[0] === 'mode')

      if (isInvalidGame) throw new Error('Invalid game slug')
      if (isInvalidMode) throw new Error('Invalid mode slug')
      throw new Error('Invalid game slug or mode slug')
    }

    return { gameSlug: data.game, mode: data.mode }
  },
  errorComponent: ErrorPage,
})
