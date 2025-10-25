import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useCreateGuest } from '@/hooks/auth'
import { authService } from '@/services/auth.service'

export function useRefreshSession() {
  const { mutate: createGuest } = useCreateGuest()

  const sessionQuery = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: authService.refreshSession,
    refetchInterval: 15 * 60 * 1000,
    retry: false,
  })

  useEffect(() => {
    if (sessionQuery.isError) createGuest()
  }, [sessionQuery.isError, createGuest])

  // token store in localStorage
  useEffect(() => {
    if (sessionQuery.isSuccess) {
      const {
        data: { accessToken },
      } = sessionQuery.data

      const data = { accessToken, lastRefreshedAt: Date.now() }
      localStorage.setItem('__matrio.atk', JSON.stringify(data))
    }
  }, [sessionQuery.data, sessionQuery.isSuccess])

  return sessionQuery
}
