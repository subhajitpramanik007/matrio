import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { USER_TYPE } from '@/types'
import { authService } from '@/services/auth.service'

const checkSession = async (): Promise<boolean> => {
  try {
    const { data } = await authService.checkSession()
    return data.role === USER_TYPE.USER
  } catch {
    return false
  }
}

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    const { pathname } = location

    const isSessionValid = await checkSession()
    if (!isSessionValid) {
      throw redirect({ to: '/signin', search: { callback: pathname } })
    }
  },
})

function RouteComponent() {
  return <Outlet />
}
