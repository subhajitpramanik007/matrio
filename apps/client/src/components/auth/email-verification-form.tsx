import * as React from 'react'
import { useLoaderData } from '@tanstack/react-router'

import { Form } from '@/components/ui/form'
import { FieldGroup } from '@/components/ui/field'
import { FormInput, SubmitButton } from '@/components/form'
import { ResendEmail } from '@/components/auth/resend-email'

import { useEmailVerification } from '@/hooks/auth'

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
          <FieldGroup>
            <FormInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
            />

            <FormInput
              control={form.control}
              name="token"
              label="Token"
              placeholder="Enter your token, check your email"
            />

            <SubmitButton isLoading={isPending}>Verify email</SubmitButton>
          </FieldGroup>
        </form>
      </Form>

      {/* Resend email */}
      <div className="flex justify-center">
        <ResendEmail email={email ?? form.getValues().email} />
      </div>
    </>
  )
}
