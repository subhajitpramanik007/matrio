import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'

export function useCreateGuest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['auth', 'guest'],
    mutationFn: authService.createGuest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'session'] })
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] })
    },
  })
}
