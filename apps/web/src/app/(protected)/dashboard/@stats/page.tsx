"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useGameStats } from "@/hooks/profile/useGameStats";
import { useProfile } from "@/hooks/profile/useProfile";

export default function StatsCard() {
  const { data: gameStatsData } = useGameStats();
  const { data: profileData } = useProfile();

  const gameStats = gameStatsData?.data.stats;
  const level = profileData?.data.profile.xpInfo.level;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Games Played</span>
          <span className="font-bold">{gameStats?.totalGames}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Win Rate</span>
          <span className="text-primary font-bold">{gameStats?.winRate}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Current Level</span>
          <span className="font-bold">{level}</span>
        </div>
      </CardContent>
    </Card>
  );
}
