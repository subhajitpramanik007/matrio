import { useEffect, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'

import toast from 'react-hot-toast'

import type {
  TEmailVerification,
  TResendVerificationEmail,
} from '@/lib/schemas'
import { EmailVerificationSchema } from '@/lib/schemas'

import { delay } from '@/lib/utils'

const RESEND_VERIFICATION_EMAIL_COOL_DOWN = 10 // seconds

const useEmailVerificationMutation = () => {
  return useMutation({
    mutationFn: async (data: TEmailVerification) => {
      await delay(3000)
      return data
    },
  })
}

const useResendVerificationEmailMutation = () => {
  return useMutation({
    mutationFn: async (data: TResendVerificationEmail) => {
      await delay(3000)
      return data
    },
  })
}

const useEmailVerification = (email?: string | null) => {
  const navigate = useNavigate()
  const emailVerification = useEmailVerificationMutation()

  const verificationForm = useForm<TEmailVerification>({
    resolver: zodResolver(EmailVerificationSchema),
    defaultValues: {
      email: email || '',
      token: '',
    },
  })

  function onSubmit(values: TEmailVerification) {
    emailVerification.mutateAsync(values, {
      onSuccess: () => {
        toast.success('Email verified successfully')
        verificationForm.reset()

        // remove verify-email from local storage
        localStorage.removeItem('verify-email')

        navigate({ to: '/' })
      },
      onError: (error) => {
        toast.error(error.message || 'Error verifying email')
      },
    })
  }

  return {
    onSubmit,
    verificationForm,
    ...emailVerification,
  }
}

const useResendVerificationEmail = () => {
  const resendVerificationEmail = useResendVerificationEmailMutation()

  const [coolDown, setCoolDown] = useState(0)
  const [isCanResend, setIsCanResend] = useState(true)

  const interval = useRef<ReturnType<typeof setInterval> | null>(null)

  function startCoolDown() {
    setIsCanResend(false)
    setCoolDown(RESEND_VERIFICATION_EMAIL_COOL_DOWN)

    if (interval.current) clearInterval(interval.current)

    interval.current = setInterval(() => {
      setCoolDown((prev) => {
        if (prev <= 1) {
          if (interval.current) clearInterval(interval.current)
          interval.current = null
          setIsCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  function onResendEmail(values: TResendVerificationEmail) {
    if (!isCanResend) return

    resendVerificationEmail.mutateAsync(values, {
      onSuccess: () => {
        toast.success('Verification email sent successfully')

        startCoolDown()
      },
      onError: (error) => {
        toast.error(error.message || 'Error sending verification email')
      },
    })
  }

  useEffect(() => {
    return () => {
      if (interval.current) clearInterval(interval.current)
    }
  }, [])

  return {
    onResendEmail,
    coolDown,
    isCanResend,
    ...resendVerificationEmail,
  }
}

export { useEmailVerification, useResendVerificationEmail }
