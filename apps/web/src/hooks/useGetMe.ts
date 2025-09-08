"use client";

import { useSessionStore } from "@/lib/store";
import { authService } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: () => authService.session(),
    enabled: useSessionStore.getState().isTokenAuthenticated,
  });
};
