"use client";

import * as React from "react";
import { motion } from "motion/react";

import {
  Calendar,
  CameraIcon,
  Clock,
  GamepadIcon,
  Target,
  TrendingUp,
  User2Icon,
  Zap,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { IGameRecentActivity, IGameStats, IProfile } from "@/types";

interface OverviewContentProps {
  profile: IProfile;
  gameStats: IGameStats;
  recentActivity: IGameRecentActivity[];
}

export const OverviewContent: React.FC<OverviewContentProps> = ({
  profile,
  recentActivity,
  gameStats,
}) => {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        {/* Profile Info */}
        <ProfileInfo
          profileData={profile}
          onSaveProfile={() => {}}
          gameStats={gameStats}
        />

        {/* Recent Activity */}
        <PlayerRecentActivity recentActivity={recentActivity} />
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Level Progress */}
        <PlayerLevelProgress profile={profile} />

        {/* Quick Stats */}
        <PlayerQuickStats gameStats={gameStats} />

        {/* Favorite Game */}
        <PlayerFavoriteGames gameStats={gameStats} />
      </div>
    </div>
  );
};

function ProfileInfo({
  profileData,
  gameStats,
  onSaveProfile,
}: {
  profileData: IProfile;
  gameStats: IGameStats;
  onSaveProfile: () => void;
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [profile, setProfile] = React.useState({
    ...profileData,
  });

  const handleSave = () => {
    onSaveProfile();
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Profile Information</CardTitle>
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-6">
          {/* Profile Picture */}
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={profile.avatar || "/placeholder.svg"}
                alt={profile.name}
              />
              <AvatarFallback>
                <User2Icon className="size-8" />
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button
                size="sm"
                className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full p-0"
                variant="secondary"
              >
                <CameraIcon className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Profile Details */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                bio: e.target.value,
              }))
            }
            disabled={!isEditing}
            rows={3}
          />
        </div>

        <div className="text-muted-foreground flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Joined {profile.joinDate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{gameStats.hoursPlayed} hours played</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PlayerRecentActivity({
  recentActivity,
}: {
  recentActivity: IGameRecentActivity[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest gaming sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              className="bg-muted/30 flex items-center justify-between rounded-lg p-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <GamepadIcon className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{activity.game}</p>
                  <p className="text-muted-foreground text-sm">
                    vs {activity.opponent}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge
                  variant={
                    activity.result === "Won" ? "default" : "destructive"
                  }
                >
                  {activity.result}
                </Badge>
                <p className="text-muted-foreground mt-1 text-xs">
                  +{activity.xpGained} XP
                </p>
                <p className="text-muted-foreground text-xs">{activity.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PlayerLevelProgress({ profile }: { profile: IProfile }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="mr-2 h-5 w-5" />
          Level Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-primary text-3xl font-bold">
            Level {profile.level}
          </div>
          <p className="text-muted-foreground text-sm">
            {profile.xp} / {profile.xpToNext} XP
          </p>
        </div>
        <Progress
          value={(profile.xp / profile.xpToNext) * 100}
          className="h-3"
        />
        <p className="text-muted-foreground text-center text-xs">
          {profile.xpToNext - profile.xp} XP to next level
        </p>
      </CardContent>
    </Card>
  );
}

function PlayerQuickStats({ gameStats }: { gameStats: IGameStats }) {
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

function PlayerFavoriteGames({ gameStats }: { gameStats: IGameStats }) {
  const { favoriteGames = [] } = gameStats;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="mr-2 h-5 w-5" />
          Favorite Games
        </CardTitle>
      </CardHeader>
      <CardContent>
        {favoriteGames.length > 0 ? (
          <div className="space-y-2">
            {favoriteGames.map((game, index) => (
              <div className="text-center" key={index}>
                <div className="text-primary text-2xl font-bold">{game}</div>
                <p className="text-muted-foreground text-sm">
                  Most played game
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <div className="text-primary text-2xl font-bold">
              No favorite game
            </div>
            <p className="text-muted-foreground text-sm">No favorite game</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
