"use client";

import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TUserSignup, UserSignupSchema } from "@matrio/shared/schemas";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "@/services/auth.service";

import { useSessionStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export const useSignup = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(UserSignupSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      termsAndConditions: false,
    },
  });

  const { mutate, isPending } = useSigninMutation();

  function onSubmit(values: TUserSignup) {
    mutate(values, {
      onSuccess: () => {
        form.reset();

        router.push("/profile");
      },
    });
  }

  return {
    form,
    isPending,
    onSubmit,
  };
};

function useSigninMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: (values: TUserSignup) => authService.signup(values),
    onSuccess: (data) => {
      useSessionStore.setState({
        isGuest: false,
        isTokenAuthenticated: true,
        accessToken: data.data?.accessToken,
        accessTokenUpdatedAt: Date.now(),
      });

      toast.success("Account created successfully");

      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
