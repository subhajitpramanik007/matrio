import { createFileRoute } from '@tanstack/react-router'

import GameLeaderboard from '@/pages/game-leaderboard'

export const Route = createFileRoute('/games/$game/leaderboard')({
  component: GameLeaderboard,
  loader: ({ params }) => ({ game: params.game }),
})
