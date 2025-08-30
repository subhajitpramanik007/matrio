"use client";

import React from "react";

import { StatsCard } from "./_components/StatsCard";
import { Achievements } from "./_components/AchievementsCard";
import { WelcomeSection } from "./_components/WelcomeSection";
import { QuickActionsCard } from "./_components/QuickActionsCard";
import { QuickPlaySection } from "./_components/QuickPlaySection";
import { RecentGamesSection } from "./_components/RecentGameSection";
import {
  achievements,
  gameStats,
  profile,
  recentActivity,
} from "../profile/dummy-data";

export default function Dashboard() {
  // const user = {
  //   name: "Alex Player",
  //   username: "alexplayer123",
  //   avatar: "/diverse-gaming-avatars.png",
  //   level: 12,
  //   xp: 2450,
  //   xpToNext: 3000,
  //   gamesPlayed: 47,
  //   winRate: 68,
  // };

  return (
    <div className="w-full max-w-7xl py-8">
      {/* Welcome Section */}
      <WelcomeSection user={{ ...profile, username: "alexplayer123" }} />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-8 lg:col-span-2">
          {/* Quick Play Games */}
          <QuickPlaySection />

          {/* Recent Games */}
          <RecentGamesSection recentGames={recentActivity} />
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Stats Card */}
          <StatsCard gameStats={gameStats} />

          {/* Achievements */}
          <Achievements achievements={achievements} />

          {/* Quick Actions */}
          <QuickActionsCard />
        </div>
      </div>
    </div>
  );
}
