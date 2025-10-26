import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useNavigate, useRouter } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'

import toast from 'react-hot-toast'

import type { TSigninForm } from '@/lib/schemas'
import { SigninFormSchema } from '@/lib/schemas'

import { authService } from '@/services/auth.service'
import { delay } from '@/lib/utils'
import { useRefreshSession, useUserData } from '@/hooks/auth'

const useSigninMutation = () => {
  const { refetch: refreshSession } = useRefreshSession()
  const { refetch: refetchUserData } = useUserData()

  return useMutation({
    mutationKey: ['auth', 'signin'],
    mutationFn: authService.signin,
    onSuccess: () => {
      refreshSession().then(() => refetchUserData())
    },
  })
}

const useSigninForm = () => {
  const { latestLocation } = useRouter()
  const navigate = useNavigate()
  const signinMutation = useSigninMutation()

  const signinForm = useForm<TSigninForm>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      emailOrUsername: '',
      password: '',
      rememberMe: true,
    },
  })

  function onSubmit(values: TSigninForm) {
    toast.promise(
      signinMutation.mutateAsync(values, {
        onSuccess: async () => {
          signinForm.reset()
          await delay(1000)

          const callback = (latestLocation.search as any)?.callback

          if (callback) {
            navigate({ to: callback })
            return
          }

          navigate({ to: '/' })
        },
      }),
      {
        loading: 'Signing in...',
        success: 'Signed in successfully',
        error: 'Error signing in',
      },
    )
  }

  return {
    onSubmit,
    signinForm,
    ...signinMutation,
  }
}

export { useSigninMutation, useSigninForm }
