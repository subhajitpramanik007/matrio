import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'

import { useMutation } from '@tanstack/react-query'

import toast from 'react-hot-toast'

import type { TSignupForm } from '@/lib/schemas'

import { delay } from '@/lib/utils'
import { SignupFormSchema } from '@/lib/schemas'

const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (data: TSignupForm) => {
      await delay(3000)
      return data
    },
  })
}

const useSignupForm = () => {
  const navigate = useNavigate()
  const signupMutation = useSignupMutation()

  const signupForm = useForm<TSignupForm>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
      termsAndConditions: false,
    },
  })

  function onSubmit(values: TSignupForm) {
    toast.promise(
      signupMutation.mutateAsync(values, {
        onSuccess: () => {
          signupForm.reset()
          localStorage.setItem('verify-email', values.email)
          navigate({ to: '/signup', search: { 'verify-email': true } })
        },
      }),
      {
        loading: 'Creating new account...',
        success: 'Account created successfully',
        error: 'Error creating account',
      },
    )
  }

  return {
    onSubmit,
    signupForm,
    ...signupMutation,
  }
}

export { useSignupMutation, useSignupForm }
