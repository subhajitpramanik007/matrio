import * as React from 'react'

import {
  FormCheckboxField,
  FormInputField,
  FormPasswordInputField,
} from '@/components/common/form'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Form, FormField } from '@/components/ui/form'

import { useSigninForm } from '@/hooks/auth/use-signin'

export const SigninForm: React.FC = () => {
  const { signinForm: form, isPending, onSubmit } = useSigninForm()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="emailOrUsername"
          render={({ field }) => (
            <FormInputField
              {...field}
              label="Email or Username"
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
          name="rememberMe"
          render={({ field }) => (
            <FormCheckboxField {...field}>Remember me</FormCheckboxField>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending && <Spinner className="mr-2" />}
          Sign in
        </Button>
      </form>
    </Form>
  )
}
