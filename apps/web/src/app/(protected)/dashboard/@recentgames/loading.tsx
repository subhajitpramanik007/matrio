import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardRecentGamesLoading() {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Recent Games</h2>
      <Card>
        <CardContent className="p-0">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <GameCardSkeleton key={index} />
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

function GameCardSkeleton() {
  return (
    <div className="border-border flex items-center justify-between border-b p-4 last:border-b-0">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-4 w-16 rounded-md" />
        <Skeleton className="h-2 w-8 rounded-md" />
      </div>
    </div>
  );
}
