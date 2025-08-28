"use client";

import toast from "react-hot-toast";

import { useSessionStore } from "@/lib/store";
import { authService } from "@/services/auth.service";
import {
  MutateOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiResponse } from "@/lib/response";
import { useRouter } from "next/navigation";

export function useSignout() {
  const { signout } = useSessionStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const signoutMutation = useMutation({
    mutationKey: ["signout"],
    mutationFn: () => authService.signout(),
    onSuccess: () => {
      signout();
      toast.success("User signed out successfully");

      queryClient.clear();
      queryClient.resetQueries();
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });

      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    ...signoutMutation,
    signout: (options?: MutateOptions<ApiResponse<unknown>>) =>
      signoutMutation.mutate(undefined, options),
  };
}
