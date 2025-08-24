"use client";

import Link from "next/link";

export function AppLogo() {
  return (
    <Link href="/" className="mb-8 inline-flex items-center space-x-2">
      <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
        <span className="text-primary-foreground text-lg font-bold">M</span>
      </div>
      <span className="text-xl font-bold">Matrio</span>
    </Link>
  );
}
