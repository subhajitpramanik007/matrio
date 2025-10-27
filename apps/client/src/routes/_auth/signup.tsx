import { createFileRoute } from '@tanstack/react-router'

import SignupPage from '@/pages/signup'

export const Route = createFileRoute('/_auth/signup')({
  component: SignupPage,
  loader(ctx) {
    const isRedirectToEmailVerification = (ctx.location.search as any)[
      'verify-email'
    ]

    const email = localStorage.getItem('verify-email')

    return { isRedirectToEmailVerification, email }
  },
})
