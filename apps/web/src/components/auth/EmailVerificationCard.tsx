"use client";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonLoader } from "../ButtonLoader";
import { ResendEmailDialog } from "./ResendEmailDialog";

import { useToRedirect } from "@/hooks/useToRedirect";
import { useEmailVerification, useGetUser } from "@/hooks/auth";

export const EmailVerificationCard: React.FC = () => {
  const user = useGetUser();

  const [openResendModal, setOpenResendModal] = useState(false);
  const { form, isPending } = useEmailVerification(user?.email);

  useEffect(() => {
    if (user && user.email) form.setValue("email", user?.email);
  }, [user, form]);

  useToRedirect(
    {
      condition: !!user?.emailVerified,
      to: "/dashboard",
      delay: 1000,
      callback() {
        toast.success("Email already verified!");
      },
    },
    [user?.emailVerified],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Verification</CardTitle>
        <CardDescription>
          Didn&apos;t receive the email? Check your spam folder.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <EmailVerificationForm email={user?.email} />

        <div>
          <p className="text-muted-foreground text-sm">
            I didn&apos;t receive the token?{" "}
            <Button
              variant="link"
              className="p-0 text-sm text-emerald-500 hover:text-emerald-600"
              onClick={() => setOpenResendModal(true)}
              disabled={isPending}
            >
              Resend Email
            </Button>
          </p>
        </div>

        <ResendEmailDialog
          open={openResendModal}
          onOpenChange={setOpenResendModal}
          onClose={() => setOpenResendModal(false)}
          email={user?.email}
        />
      </CardContent>
    </Card>
  );
};

function EmailVerificationForm({ email }: { email?: string }) {
  const { form, isPending, onSubmit } = useEmailVerification(email);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your token, check your email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={
            isPending || (form.formState.isDirty && !form.formState.isValid)
          }
        >
          <ButtonLoader isLoading={isPending} />
          Verify Email
        </Button>
      </form>
    </Form>
  );
}
