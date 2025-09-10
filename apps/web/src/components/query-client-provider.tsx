"use client";

import { refreshSessionQueryOptions } from "@/hooks/auth";
import { ChildrenProps } from "@/types";
import {
  QueryClient,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
      refetchOnReconnect: true,
      enabled: typeof window !== "undefined",
    },
  },
});

export function QueryClientProvider({ children }: ChildrenProps) {
  queryClient.prefetchQuery(refreshSessionQueryOptions);

  return <Provider client={queryClient}>{children}</Provider>;
}
