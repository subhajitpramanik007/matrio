import { createFileRoute } from '@tanstack/react-router'
import { LoadingScreen } from '@/components/loading-screen'
import { Container } from '@/components/common/container'

export const Route = createFileRoute('/')({
  component: App,
  pendingComponent: () => <LoadingScreen />,
})

function App() {
  return (
    <Container>
      <h1 className="text-4xl font-bold">Home</h1>
    </Container>
  )
}
