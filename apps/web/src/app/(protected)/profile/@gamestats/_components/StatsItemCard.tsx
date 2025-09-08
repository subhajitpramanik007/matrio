"use client";

import { LucideProps } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatsItemCard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div
          data-slot="stats-item-card"
          className={cn("flex items-center justify-between", className)}
          {...props}
        />
      </CardContent>
    </Card>
  );
}

function StatsItemCardData({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="stats-item-card-data"
      className={cn("text-2xl font-bold", className)}
      {...props}
    />
  );
}

function StatsItemCardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="stats-item-card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function StatsItemCardIcon({
  icon: Icon,
  className,
  ...props
}: {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  className?: string;
} & LucideProps) {
  return (
    <Icon
      data-slot="stats-item-card-icon"
      className={cn("text-primary h-8 w-8", className)}
      {...props}
    />
  );
}

export { StatsItemCardData, StatsItemCardDescription, StatsItemCardIcon };
