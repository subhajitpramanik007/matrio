"use client";

import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { SessionProvider } from "@/components/auth";
import { ChildrenProps } from "@/types";

export function Providers({ children }: ChildrenProps) {
  return (
    <SessionProvider>
      <Toaster />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </SessionProvider>
  );
}
