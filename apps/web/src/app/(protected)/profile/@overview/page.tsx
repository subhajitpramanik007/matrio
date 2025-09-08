"use client";

import { useProfile } from "@/hooks/profile/useProfile";
import { gameStats, recentActivity } from "../dummy-data";
import React from "react";
import { ProfileInfo } from "./_components/profile-info";
import { PlayerLevelProgress } from "./_components/player-level-progress";
import { PlayerQuickStats } from "./_components/player-quick-stats";
import { PlayerFavoriteGames } from "./_components/player-fav-games";
import { PlayerRecentActivity } from "./_components/player-recent-activity";

export default function ProfileOverview() {
  const { data } = useProfile();

  const profile = data?.data.profile;

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        {/* Profile Info */}
        <ProfileInfo
          profileData={profile}
          // TODO: Add onSaveProfile and hoursPlayed add to gameStats
          onSaveProfile={() => {}}
          hoursPlayed={0}
        />

        {/* Recent Activity */}
        <PlayerRecentActivity recentActivity={recentActivity} />
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Level Progress */}
        <PlayerLevelProgress {...profile.xpInfo} />

        {/* Quick Stats */}
        <PlayerQuickStats gameStats={gameStats} />

        {/* Favorite Game */}
        <PlayerFavoriteGames favoriteGame={profile.favoriteGame} />
      </div>
    </div>
  );
}
