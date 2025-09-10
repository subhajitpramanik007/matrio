"use client";

import {
  ClockIcon,
  GamepadIcon,
  TrendingUpIcon,
  TrophyIcon,
} from "lucide-react";
import {
  StatsItemCard,
  StatsItemCardData,
  StatsItemCardDescription,
  StatsItemCardIcon,
} from "./_components/StatsItemCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SpecificGameStatsBar } from "./_components/SpecificGameStatsBar";
import { useGameStats } from "@/hooks/profile/useGameStats";

import { motion } from "motion/react";
import ProfileStatsLoading from "./loading";

export default function ProfileGameStats() {
  const { data, isLoading, error, isError } = useGameStats();

  if (isLoading) return <ProfileStatsLoading />;

  const stats = data?.data.stats;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Games */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          layoutId="totalGames"
        >
          <StatsItemCard>
            <div>
              <StatsItemCardData>{stats?.totalGames}</StatsItemCardData>
              <StatsItemCardDescription>Total Games</StatsItemCardDescription>
            </div>
            <StatsItemCardIcon icon={GamepadIcon} />
          </StatsItemCard>
        </motion.div>

        {/* Total Wins */}
        <StatsItemCard>
          <div>
            <StatsItemCardData>{stats?.wins}</StatsItemCardData>
            <StatsItemCardDescription>Total Wins</StatsItemCardDescription>
          </div>
          <StatsItemCardIcon icon={TrophyIcon} />
        </StatsItemCard>

        {/* Win Rate */}
        <StatsItemCard>
          <div>
            <StatsItemCardData>{stats?.winRate}%</StatsItemCardData>
            <StatsItemCardDescription>Win Rate</StatsItemCardDescription>
          </div>
          <StatsItemCardIcon icon={TrendingUpIcon} />
        </StatsItemCard>

        {/* Time Played */}
        <StatsItemCard>
          <div>
            <StatsItemCardData>{stats?.hoursPlayed}</StatsItemCardData>
            <StatsItemCardDescription>Time Played</StatsItemCardDescription>
          </div>
          <StatsItemCardIcon icon={ClockIcon} />
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
            {stats?.specificGameStats?.map((gameStats, index) => (
              <SpecificGameStatsBar key={index} {...gameStats} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
