import * as React from 'react'
import { useLoaderData } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Form, FormField } from '@/components/ui/form'
import { FormInputField } from '@/components/common/form'

import { useEmailVerification, useResendVerificationEmail } from '@/hooks/auth'

export const EmailVerificationForm: React.FC = () => {
  const { email } = useLoaderData({ from: '/_auth/signup' })

  const {
    verificationForm: form,
    isPending,
    onSubmit,
  } = useEmailVerification(email)

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormInputField
                {...field}
                label="Email"
                placeholder="Enter your email"
              />
            )}
          />

          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormInputField
                {...field}
                label="Token"
                placeholder="Enter your token, check your email"
              />
            )}
          />

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending && <Spinner className="mr-2" />}
            Sign in
          </Button>
        </form>
      </Form>

      {/* Resend email */}
      <div className="flex justify-center">
        <ResendEmail email={email ?? form.getValues().email} />
      </div>
    </>
  )
}

function ResendEmail({ email }: { email: string }) {
  const { onResendEmail, isPending, coolDown, isCanResend } =
    useResendVerificationEmail()

  return (
    <div className="flex">
      <Button
        variant="link"
        type="button"
        size="none"
        className="text-orange-400"
        onClick={() => onResendEmail({ email })}
        disabled={!isCanResend || isPending}
      >
        {isPending && <Spinner className="mr-2" />}
        <span>Resend Email</span>
      </Button>
      {coolDown ? (
        <span className="text-muted-foreground ml-2 text-sm">
          {coolDown} seconds
        </span>
      ) : null}
    </div>
  )
}
