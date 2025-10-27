import { useLoaderData } from '@tanstack/react-router'

import {
  AuthCard,
  AuthContent,
  AuthFooter,
  AuthHeader,
  EmailVerificationForm,
  SignUpForm,
} from '@/components/auth'

export default function SignUp() {
  const { isRedirectToEmailVerification } = useLoaderData({
    from: '/_auth/signup',
  })

  if (isRedirectToEmailVerification) {
    return (
      <AuthCard>
        <AuthHeader
          title="Welcome to"
          actionText="Email verification"
          description="Check your email to verify your account"
        />
        <AuthContent>
          <EmailVerificationForm />
        </AuthContent>
      </AuthCard>
    )
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Welcome to"
        actionText="Sign Up"
        description="Create your account to save progress and play with friends"
      />
      <AuthContent>
        <SignUpForm />
      </AuthContent>
      <AuthFooter
        footerText="Already have an account?"
        footerLinkText="Sign in"
        footerLink="/signin"
      />
    </AuthCard>
  )
}
