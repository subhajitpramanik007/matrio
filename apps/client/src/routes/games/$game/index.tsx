import { createFileRoute } from '@tanstack/react-router'

import SingleGame from '@/pages/single-game'

export const Route = createFileRoute('/games/$game/')({
  component: SingleGame,
  loader: ({ params }) => ({ game: params.game }),
})
