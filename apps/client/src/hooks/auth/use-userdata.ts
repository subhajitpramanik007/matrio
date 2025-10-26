import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/hooks/auth'
import { authService } from '@/services/auth.service'

export function useUserData(isAuthenticated: boolean = true) {
  const { onInitAsGuest, onInitAsUser } = useAuth()

  const userQuery = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authService.getUser,
    enabled: isAuthenticated,
  })

  // store user data in auth context
  useEffect(() => {
    if (!userQuery.isSuccess) return

    const user = userQuery.data.data.user

    const isGuest = user.role === 'GUEST'
    if (isGuest) onInitAsGuest({ user })
    else onInitAsUser({ user })
  }, [userQuery.data, userQuery.isSuccess])

  return userQuery
}
