"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="mb-8">
      <div className="mb-6 flex justify-between">
        <div className="w-full space-y-2">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-10 w-20" />
      </div>
      <div>
        <Skeleton className="h-28 w-full" />
      </div>
    </div>
  );
}
