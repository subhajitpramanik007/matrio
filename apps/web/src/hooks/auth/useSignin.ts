"use client";

import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TUserSignin, UserSigninSchema } from "@matrio/shared/schemas";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "@/services/auth.service";

import { useSessionStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export const useSignin = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(UserSigninSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
      rememberMe: false,
    },
  });

  const { mutate, isPending } = useSigninMutation();

  const onSubmit = (values: TUserSignin) => {
    mutate(values, {
      onSuccess: () => {
        form.reset();
        router.push("/dashboard");
      },
    });
  };

  return {
    form,
    isPending,
    onSubmit,
  };
};

function useSigninMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["signin"],
    mutationFn: (values: TUserSignin) => authService.signin(values),
    onSuccess: (data) => {
      useSessionStore.setState({
        isGuest: false,
        isTokenAuthenticated: true,
        accessToken: data.data?.accessToken,
        accessTokenUpdatedAt: Date.now(),
      });

      toast.success("User signed in successfully");

      queryClient.refetchQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
