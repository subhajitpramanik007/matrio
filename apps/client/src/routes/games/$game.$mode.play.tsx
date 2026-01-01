import { createFileRoute } from '@tanstack/react-router'
import GamePlayGroundPage from '@/pages/GamePlayGround'

export const Route = createFileRoute('/games/$game/$mode/play')({
  component: GamePlayGroundPage,
})
