"use client";

import { IGameStats } from "@/types";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PlayerQuickStats({ gameStats }: { gameStats: IGameStats }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Quick Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Games</span>
          <span className="font-bold">{gameStats.totalGames}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Win Rate</span>
          <span className="text-primary font-bold">{gameStats.winRate}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Current Streak</span>
          <span className="font-bold">{gameStats.currentStreak}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Best Streak</span>
          <span className="font-bold">{gameStats.longestWinStreak}</span>
        </div>
      </CardContent>
    </Card>
  );
}
