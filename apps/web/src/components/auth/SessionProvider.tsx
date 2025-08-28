"use client";

import * as React from "react";
import { useSessionStore } from "@/lib/store";
import { SessionState } from "@/types/session.type";

import { useGetMe } from "@/hooks/useGetMe";
import { useCreateGuest, useRefreshToken } from "@/hooks/auth";
import { usePathname, useRouter } from "next/navigation";

export const SessionContext = React.createContext<SessionState>(undefined!);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, isGuest, user } = useSessionStore();

  const { data, isSuccess, isPending, error } = useGetMe();
  const { mutateAsync: createGuest } = useCreateGuest();
  const { mutateAsync: refreshTokenMutate } = useRefreshToken();

  React.useEffect(() => {
    refreshTokenMutate(undefined, {
      onError: () => {
        createGuest();
      },
    });

    const interval = setInterval(
      () => {
        refreshTokenMutate();
      },
      15 * 60 * 1000,
    );

    return () => clearInterval(interval);
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
  }, [data]);

  React.useEffect(() => {
    if (error?.cause) {
      router.push(`${pathname}?error=${error.cause}`);
    }
  }, [error?.cause]);

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
