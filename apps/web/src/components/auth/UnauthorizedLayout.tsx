"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useSession } from "@/hooks/auth";

interface UnauthorizedLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const UnauthorizedLayout: React.FC<UnauthorizedLayoutProps> = ({
  children,
  className,
  ...props
}) => {
  const { isAuthenticated, isGuest } = useSession();

  if (isAuthenticated && !isGuest) {
    return null;
  }

  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
};
