"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { StatsItemCardIcon } from "./_components/StatsItemCard";
import { GamepadIcon } from "lucide-react";

export default function ProfileStatsLoading() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
      </div>

      <SpecificGameStatsBarSkeleton />
      <SpecificGameStatsBarSkeleton />
    </div>
  );
}

function StatsCardSkeleton() {
  return (
    <Skeleton className="bg-muted h-32 rounded-md border">
      <div className="flex h-full w-full items-end justify-between p-4">
        <div className="flex h-full w-full flex-col justify-end space-y-2">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-8 w-1/2" />
        </div>
        <StatsItemCardIcon icon={GamepadIcon} className="animate-pulse" />
      </div>
    </Skeleton>
  );
}

function SpecificGameStatsBarSkeleton() {
  return <Skeleton className="h-40 w-full border" />;
}
