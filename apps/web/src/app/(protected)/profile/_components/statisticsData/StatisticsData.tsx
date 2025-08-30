"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IGameStatsWithGames } from "@/types";
import {
  StatsItemCard,
  StatsItemCardData,
  StatsItemCardDescription,
  StatsItemCardIcon,
} from "./StatsItemCard";
import { SpecificGameStatsBar } from "./SpecificGameStatsBar";

import { Trophy, GamepadIcon, TrendingUpIcon, Clock } from "lucide-react";

interface StatisticsDataProps {
  gameStats: IGameStatsWithGames;
}

export const StatisticsData: React.FC<StatisticsDataProps> = ({
  gameStats,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Games */}
        <StatsItemCard>
          <div>
            <StatsItemCardData>{gameStats.totalGames}</StatsItemCardData>
            <StatsItemCardDescription>Total Games</StatsItemCardDescription>
          </div>
          <StatsItemCardIcon icon={GamepadIcon} />
        </StatsItemCard>

        {/* Total Wins */}
        <StatsItemCard>
          <div>
            <StatsItemCardData>{gameStats.totalWins}</StatsItemCardData>
            <StatsItemCardDescription>Total Wins</StatsItemCardDescription>
          </div>
          <StatsItemCardIcon icon={Trophy} />
        </StatsItemCard>

        {/* Win Rate */}
        <StatsItemCard>
          <div>
            <StatsItemCardData>{gameStats.winRate}%</StatsItemCardData>
            <StatsItemCardDescription>Win Rate</StatsItemCardDescription>
          </div>
          <StatsItemCardIcon icon={TrendingUpIcon} />
        </StatsItemCard>

        {/* Time Played */}
        <StatsItemCard>
          <div>
            <StatsItemCardData>{gameStats.hoursPlayed}</StatsItemCardData>
            <StatsItemCardDescription>Time Played</StatsItemCardDescription>
          </div>
          <StatsItemCardIcon icon={Clock} />
        </StatsItemCard>
      </div>

      {/* Detailed Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Game Breakdown</CardTitle>
          <CardDescription>Performance by game type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <SpecificGameStatsBar {...gameStats.games["tic-tac-toe"]} />
            <SpecificGameStatsBar {...gameStats.games["checkers"]} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
