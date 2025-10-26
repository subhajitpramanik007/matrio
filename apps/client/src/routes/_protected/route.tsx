import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    const {
      authContext: { isAuthenticated },
    } = context
    const { pathname } = location

    if (!isAuthenticated) {
      throw redirect({ to: '/signin', search: { callback: pathname } })
    }
  },
})

function RouteComponent() {
  return <Outlet />
}
