import * as React from 'react'
import { Link } from '@tanstack/react-router'

import {
  FormCheckboxField,
  FormInputField,
  FormPasswordInputField,
} from '@/components/common/form'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Form, FormField } from '@/components/ui/form'

import { useSignupForm } from '@/hooks/auth/use-signup'

export const SignUpForm: React.FC = () => {
  const { signupForm: form, isPending, onSubmit } = useSignupForm()

  return (
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
          name="password"
          render={({ field }) => <FormPasswordInputField {...field} />}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormInputField
              {...field}
              label="Username"
              placeholder="Write your username"
              description="Optional, you can write your username"
            />
          )}
        />

        <FormField
          control={form.control}
          name="termsAndConditions"
          render={({ field }) => (
            <FormCheckboxField {...field}>
              I accept the {/* TODO: add link */}
              <Link
                to="."
                className="hover:text-primary underline underline-offset-4"
              >
                terms and conditions
              </Link>
            </FormCheckboxField>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending && <Spinner className="mr-2" />}
          Create new account
        </Button>
      </form>
    </Form>
  )
}
