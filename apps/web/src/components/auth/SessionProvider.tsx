"use client";

import * as React from "react";
import { useSessionStore } from "@/lib/store";
import { SessionState } from "@/types/session.type";

import { useGetMe } from "@/hooks/useGetMe";
import { useRefreshSession } from "@/hooks/auth";

export const SessionContext = React.createContext<SessionState>(undefined!);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = React.useState(false);
  const { isAuthenticated, isGuest, user } = useSessionStore();

  const { isSuccess: isRefreshSuccess } = useRefreshSession();
  const { data, isSuccess, isPending } = useGetMe({
    enabled: isMounted || isRefreshSuccess,
  });

  // Ensure hydration compatibility
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (isSuccess && data.data?.user) {
      useSessionStore.setState({
        isAuthenticated: true,
        isGuest: data.data?.user.role === "GUEST",
        user: data.data?.user,
        status: "authenticated",
      });
    } else {
      useSessionStore.getState().clear();
    }
  }, [data, isSuccess]);

  return (
    <SessionContext.Provider
      value={{
        isPending,
        isAuthenticated,
        isGuest,
        user,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
