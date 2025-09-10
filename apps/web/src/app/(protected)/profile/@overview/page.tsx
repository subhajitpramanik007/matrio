"use client";

import { ProfileInfo } from "./_components/profile-info";
import { PlayerQuickStats } from "./_components/player-quick-stats";
import { PlayerFavoriteGames } from "./_components/player-fav-games";
import { PlayerLevelProgress } from "./_components/player-level-progress";
import { PlayerRecentActivity } from "./_components/player-recent-activity";

import { useGameStats } from "@/hooks/profile/useGameStats";
import { useProfile } from "@/hooks/profile/useProfile";
import { useGameActivities } from "@/hooks/profile/useGameActivities";

export default function ProfileOverview() {
  const { data } = useProfile();
  const { data: statsData } = useGameStats();
  const { data: recentActivitiesData } = useGameActivities();

  const recentActivities = recentActivitiesData?.data.gameHistory;

  const profile = data?.data.profile;
  const stats = statsData?.data.stats;

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        {/* Profile Info */}
        <ProfileInfo
          profileData={profile}
          // TODO: Add onSaveProfile and hoursPlayed add to gameStats
          onSaveProfile={() => {}}
          hoursPlayed={stats.hoursPlayed}
        />

        {/* Recent Activity */}
        <PlayerRecentActivity recentActivity={recentActivities} />
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Level Progress */}
        <PlayerLevelProgress {...profile.xpInfo} />

        {/* Quick Stats */}
        <PlayerQuickStats gameStats={stats} />

        {/* Favorite Game */}
        <PlayerFavoriteGames favoriteGame={profile.favoriteGame} />
      </div>
    </div>
  );
}
