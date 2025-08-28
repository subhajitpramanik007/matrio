"use client";

import { useSessionStore } from "@/lib/store";
import { authService } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateGuest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["session", "guest"],
    mutationFn: () => authService.guest(),
    onSuccess: (res) => {
      useSessionStore.setState({
        isTokenAuthenticated: true,
        accessToken: res.data?.accessToken,
        accessTokenUpdatedAt: Date.now(),
      });

      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
