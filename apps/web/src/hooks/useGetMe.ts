"use client";

import { useSessionStore } from "@/lib/store";
import { authService } from "@/services/auth.service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type UseGetMeOptions = Partial<UseQueryOptions<any, any, any, string[]>>;

export const useGetMe = (options: UseGetMeOptions = {}) => {
  const isTokenAuthenticated = useSessionStore(
    (state) => state.isTokenAuthenticated,
  );

  return useQuery({
    queryKey: ["user", "me"],
    queryFn: () => authService.session(),
    enabled: isTokenAuthenticated && options.enabled !== false,
    ...options,
  });
};
