import { createFileRoute } from '@tanstack/react-router'
import { ErrorPage } from '@/components/error'
import GameModePage from '@/pages/GameMode'

export const Route = createFileRoute('/games/$game/$mode/')({
  component: GameModePage,
  errorComponent: ErrorPage,
})
