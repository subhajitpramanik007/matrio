"use client";

import { Progress } from "@/components/ui/progress";
import { ISpecificGameStatsData } from "@/types";

export function SpecificGameStatsBar(gameStats?: ISpecificGameStatsData) {
  if (!gameStats) return null;

  const { gameName, winRate, totalGames, wins } = gameStats;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-medium">{gameName}</span>
        <span className="text-muted-foreground text-sm">
          {winRate}% win rate
        </span>
      </div>
      <Progress value={winRate} className="h-2" />
      <p className="text-muted-foreground mt-1 text-xs">
        {wins} wins out of {totalGames} games
      </p>
    </div>
  );
}
