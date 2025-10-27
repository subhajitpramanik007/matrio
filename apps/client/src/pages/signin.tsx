import {
  AuthCard,
  AuthContent,
  AuthFooter,
  AuthHeader,
  SigninForm,
} from '@/components/auth'

export default function SignIn() {
  return (
    <AuthCard>
      <AuthHeader
        title="Welcome back to"
        actionText="Sign In"
        description="Enter your email and password to access your account"
      />
      <AuthContent>
        <SigninForm />
      </AuthContent>
      <AuthFooter
        footerText="Don't have an account?"
        footerLinkText="Create one now"
        footerLink="/signup"
      />
    </AuthCard>
  )
}
