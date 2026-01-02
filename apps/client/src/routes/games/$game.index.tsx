import { createFileRoute } from '@tanstack/react-router'
import { SingleGameSettingsPage } from '@/pages/GameSetting'

export const Route = createFileRoute('/games/$game/')({
  component: SingleGameSettingsPage,
})
