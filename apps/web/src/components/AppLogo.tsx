"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

export function AppLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("mb-8 inline-flex items-center space-x-2", className)}
    >
      <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
        <span className="text-primary-foreground text-lg font-bold">M</span>
      </div>
      <span className="text-xl font-bold">Matrio</span>
    </Link>
  );
}
