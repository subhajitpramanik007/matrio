import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCreateGuest } from '@/hooks/auth'
import { authService } from '@/services/auth.service'
import { delay } from '@/lib/utils'

export function useRefreshSession() {
  const queryClient = useQueryClient()

  const { mutateAsync: createGuest } = useCreateGuest()

  const sessionQuery = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: authService.refreshSession,
    refetchInterval: 15 * 60 * 1000,
    retry: false,
  })

  useEffect(() => {
    if (sessionQuery.isError) {
      createGuest(undefined, {
        onSuccess: async () => {
          await delay(1000)
          sessionQuery.refetch().then(() => {
            queryClient.invalidateQueries({ queryKey: ['users', 'me'] })
          })
        },
        onError: () => {
          console.log('Error creating guest')
        },
      })
    }
  }, [sessionQuery.isError])

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
