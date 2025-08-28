"use client";

import { useSessionStore } from "@/lib/store";
import { userService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: () => userService.getMe(),
    enabled: useSessionStore.getState().isTokenAuthenticated,
  });
};
