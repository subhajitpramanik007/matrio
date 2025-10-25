import * as React from 'react'

import {
  FormCheckbox,
  FormInput,
  FormPasswordInput,
  SubmitButton,
} from '@/components/form'
import { Form } from '@/components/ui/form'
import { FieldGroup } from '@/components/ui/field'

import { useSigninForm } from '@/hooks/auth/use-signin'

export const SigninForm: React.FC = () => {
  const { signinForm: form, isPending, onSubmit } = useSigninForm()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup>
          <FormInput
            control={form.control}
            name="emailOrUsername"
            label="Email or Username"
            placeholder="Enter your email or username"
          />

          <FormPasswordInput
            control={form.control}
            name="password"
            label="Password"
          />

          <FormCheckbox
            control={form.control}
            name="rememberMe"
            label="Remember me"
          />

          <SubmitButton isLoading={isPending}>Signin</SubmitButton>
        </FieldGroup>
      </form>
    </Form>
  )
}
