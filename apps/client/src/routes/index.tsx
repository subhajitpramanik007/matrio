import { createFileRoute } from '@tanstack/react-router'
import { LoadingScreen } from '@/components/loading-screen'

import HomePage from '@/pages/home'

export const Route = createFileRoute('/')({
  component: HomePage,
  pendingComponent: () => <LoadingScreen />,
})
