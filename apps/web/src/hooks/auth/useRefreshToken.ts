"use client";

import { useSessionStore } from "@/lib/store";
import { authService } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["session", "refresh"],
    mutationFn: () => authService.refreshToken(),
    onSuccess: (res) => {
      useSessionStore.setState({
        isTokenAuthenticated: true,
        accessToken: res.data?.accessToken,
        accessTokenUpdatedAt: Date.now(),
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
};
