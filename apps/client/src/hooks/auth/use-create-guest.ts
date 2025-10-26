import { useMutation } from '@tanstack/react-query'

import { authService } from '@/services/auth.service'

export function useCreateGuest() {
  return useMutation({
    mutationKey: ['auth', 'guest'],
    mutationFn: authService.createGuest,
  })
}
