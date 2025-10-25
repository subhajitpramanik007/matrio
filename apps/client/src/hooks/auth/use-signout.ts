import toast from 'react-hot-toast'

import { useNavigate } from '@tanstack/react-router'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'

import { useAuth } from '@/hooks/auth'
import { delay } from '@/lib/utils'

export const useSignoutMutation = () => {
  const { onLogout } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['auth', 'signout'],
    mutationFn: () => authService.signout(),
    onSuccess: async () => {
      queryClient.clear()

      onLogout()

      toast.success('Signed out successfully')
      await delay(1000)
      navigate({ to: '/signin' })
    },
    onError: (error) => {
      toast.error(error.message || 'Error signing out')
    },
  })
}

export const useSignout = () => {
  const signoutMutation = useSignoutMutation()

  return {
    signout: () => signoutMutation.mutate(),
    isPending: signoutMutation.isPending,
    isSuccess: signoutMutation.isSuccess,
  }
}
