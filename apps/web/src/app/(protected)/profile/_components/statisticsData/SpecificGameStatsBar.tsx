"use client";

import { Progress } from "@/components/ui/progress";
import { ISpecificGameStats } from "@/types";

export function SpecificGameStatsBar(gameStats: ISpecificGameStats) {
  const { title, stats } = gameStats;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-medium">{title}</span>
        <span className="text-muted-foreground text-sm">
          {stats.winRate}% win rate
        </span>
      </div>
      <Progress value={stats.winRate} className="h-2" />
      <p className="text-muted-foreground mt-1 text-xs">
        {stats.totalWins} wins out of {stats.totalGames} games
      </p>
    </div>
  );
}
