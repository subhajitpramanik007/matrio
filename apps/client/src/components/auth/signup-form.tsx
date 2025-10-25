import * as React from 'react'
import { Link } from '@tanstack/react-router'

import { FieldGroup } from '@/components/ui/field'
import {
  FormCheckbox,
  FormInput,
  FormPasswordInput,
  SubmitButton,
} from '@/components/form'

import { Form } from '@/components/ui/form'

import { useSignupForm } from '@/hooks/auth/use-signup'

export const SignUpForm: React.FC = () => {
  const { signupForm: form, isPending, onSubmit } = useSignupForm()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup>
          <FormInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
          />

          <FormPasswordInput
            control={form.control}
            name="password"
            label="Password"
          />

          <FormInput
            control={form.control}
            name="username"
            label="Username"
            description="Optional, you can write your username"
            placeholder="Write your username"
          />

          <FormCheckbox
            control={form.control}
            name="termsAndConditions"
            label={<TermsAndConditions />}
          />

          <SubmitButton isLoading={isPending}>Create new account</SubmitButton>
        </FieldGroup>
      </form>
    </Form>
  )
}

const TermsAndConditions = () => (
  <span>
    I accept the {/* TODO: add link */}
    <Link to="/" className="hover:text-primary underline underline-offset-4">
      terms and conditions
    </Link>
  </span>
)
