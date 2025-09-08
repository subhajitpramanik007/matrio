import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrophyIcon } from "lucide-react";

export default function ProfileLoading() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <TrophyIcon className="mr-2 h-5 w-5" />
          Achievements
        </div>
        <Skeleton className="h-4 w-20" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <AchievementsDetailsCardSkeleton key={i} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AchievementsDetailsCardSkeleton() {
  return <Skeleton className="h-20 w-full border"></Skeleton>;
}
