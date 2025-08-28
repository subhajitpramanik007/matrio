"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useSession } from "@/hooks/auth";

interface AuthorizedLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const AuthorizedLayout: React.FC<AuthorizedLayoutProps> = ({
  children,
  className,
  ...props
}) => {
  const { isAuthenticated, isGuest } = useSession();

  if (!isAuthenticated || isGuest) return null;

  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
};
