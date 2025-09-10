"use client";

import { useEffect } from "react";
import { useSessionStore } from "@/lib/store";
import { authService, TAuthResponse } from "@/services/auth.service";
import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useCreateGuest } from "./useCreateGuest";
import { ApiResponse } from "@/lib/response";

export const refreshSessionQueryOptions: UseQueryOptions<
  ApiResponse<TAuthResponse>
> = {
  queryKey: ["session"],
  queryFn: () => authService.refreshToken(),
  refetchInterval: 90_000,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
};

export const useRefreshSession = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createGuest } = useCreateGuest();

  const refreshSessionQuery = useQuery({
    ...refreshSessionQueryOptions,
  });

  const { isSuccess, data, isError, isFetched } = refreshSessionQuery;

  // Update session state on data change
  useEffect(() => {
    if (isSuccess && data) {
      useSessionStore.setState({
        isTokenAuthenticated: true,
        accessToken: data.data.accessToken,
        accessTokenUpdatedAt: Date.now(),
      });

      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    }
  }, [isSuccess, data, queryClient]);

  // if refreshSessionQuery.data is null, create a guest
  useEffect(() => {
    if (isFetched && isError) {
      createGuest();
    }
  }, [isFetched, isError, createGuest]);

  return refreshSessionQuery;
};
