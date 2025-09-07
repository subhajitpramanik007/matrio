"use client";

import { useSessionStore } from "@/lib/store";
import { authService } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["auth", "session"],
    queryFn: () => authService.session(),
    enabled: useSessionStore.getState().isTokenAuthenticated,
  });
};
