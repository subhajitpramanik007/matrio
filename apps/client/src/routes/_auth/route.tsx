import { Outlet, createFileRoute } from '@tanstack/react-router'
import { AuthLayout } from '@/components/auth'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  )
}
