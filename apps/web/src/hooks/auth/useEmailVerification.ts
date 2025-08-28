"use client";

import toast from "react-hot-toast";
import { authService } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EmailVerificationSchema,
  TEmailVerification,
} from "@matrio/shared/schemas";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useEmailVerification = (email?: string) => {
  const router = useRouter();

  const form = useForm<TEmailVerification>({
    resolver: zodResolver(EmailVerificationSchema),
    defaultValues: {
      email: email ?? "",
      token: "",
    },
  });

  const { mutateAsync: verifyEmail, isPending } =
    useEmailVerificationMutation();

  function onSubmit(values: TEmailVerification) {
    toast.promise(
      verifyEmail(values, {
        onSuccess: () => {
          form.reset();
          router.push("/profile");

          setTimeout(() => router.refresh(), 1000);
        },
      }),
      {
        loading: "Verifying email...",
        success: "Email verified successfully",
        error: "Error verifying email",
      },
    );
  }

  useEffect(() => {
    if (email) {
      form.setValue("email", email);
    }
  }, [email, form]);

  return {
    form,
    isPending,
    onSubmit,
  };
};

function useEmailVerificationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: TEmailVerification) => authService.verifyEmail(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
    onError: () => {},
    onSettled: () => {},
  });
}
