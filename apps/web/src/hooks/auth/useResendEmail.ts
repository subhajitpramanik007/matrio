"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

import { authService } from "@/services/auth.service";
import {
  ResendVerificationEmailSchema,
  TResendVerificationEmail,
} from "@matrio/shared/schemas";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

export function useResendEmail(email?: string, onSuccess?: () => void) {
  const { mutateAsync: resendVerificationEmail, isPending: isResending } =
    useResendVerificationEmailMutation();

  const form = useForm({
    resolver: zodResolver(ResendVerificationEmailSchema),
    defaultValues: {
      email: email ?? "",
    },
  });

  function onSubmit(values: TResendVerificationEmail) {
    toast.promise(
      resendVerificationEmail(values, {
        onSuccess: () => {
          form.reset();
          if (onSuccess) onSuccess();
        },
      }),
      {
        loading: "Resending verification email...",
        success: "Verification email resent successfully",
        error: "Error resending verification email",
      },
    );
  }

  useEffect(() => {
    if (email) {
      form.setValue("email", email);
    }
  }, [email]);

  return { form, isResending, onSubmit };
}

function useResendVerificationEmailMutation() {
  return useMutation({
    mutationFn: (values: TResendVerificationEmail) =>
      authService.resendVerificationEmail(values),
  });
}
