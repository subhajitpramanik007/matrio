import * as React from 'react'

import { useLoaderData } from '@tanstack/react-router'

const GameLeaderboard: React.FC = () => {
  const { game } = useLoaderData({ from: '/games/$game/leaderboard' })

  return <div>game-leaderboard {game}</div>
}

export default GameLeaderboard
