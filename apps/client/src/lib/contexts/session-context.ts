import { createReactContext } from '@/lib/create-react-context'
import { useRefreshSession, useUserData } from '@/hooks/auth'

/**
 * Session
 * - get session
 * - if failed, create guest
 * - get user
 */
export const SessionContext = createReactContext(
  () => {
    const { isSuccess } = useRefreshSession()

    useUserData(isSuccess)

    return {}
  },
  { name: 'Session' },
)

export const SessionProvider = SessionContext.Provider
