"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

export function ButtonLoader({
  className,
  isLoading,
}: {
  isLoading: boolean;
  className?: string;
}) {
  if (!isLoading) return null;

  return <Loader2Icon className={cn("size-5 animate-spin", className)} />;
}
