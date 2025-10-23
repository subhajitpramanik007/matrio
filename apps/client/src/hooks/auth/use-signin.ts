import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'

import toast from 'react-hot-toast'

import type { TSigninForm } from '@/lib/schemas'
import { SigninFormSchema } from '@/lib/schemas'

import { delay } from '@/lib/utils'

const useSigninMutation = () => {
  return useMutation({
    mutationFn: async (data: TSigninForm) => {
      await delay(3000)
      return data
    },
  })
}

const useSigninForm = () => {
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
        onSuccess: () => {
          signinForm.reset()
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
