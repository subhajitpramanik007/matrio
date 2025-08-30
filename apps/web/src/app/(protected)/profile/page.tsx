"use client";

import { useState } from "react";
import { IProfileSettings } from "@/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  OverviewContent,
  StatisticsData,
  AchievementsDetails,
  ProfileSubHeader,
  UserSettings,
} from "./_components";

import {
  achievements,
  gameStats,
  profile,
  profileSettings,
  recentActivity,
} from "./dummy-data";

export default function ProfilePage() {
  const [settings, setSettings] = useState<IProfileSettings>(profileSettings);

  const handleSettingChange = (
    setting: keyof typeof settings,
    value: boolean,
  ) => {
    setSettings((prev) => ({ ...prev, [setting]: value }));
  };

  return (
    <div className="bg-background container mx-auto min-h-screen w-full max-w-7xl py-4">
      {/* Navigation */}
      <ProfileSubHeader profile={profile} />

      <div className="container w-full max-w-7xl py-8">
        <div className="mx-auto max-w-5xl">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <OverviewContent
                profile={profile}
                gameStats={gameStats}
                recentActivity={recentActivity}
              />
            </TabsContent>

            {/* Statistics Tab */}
            <TabsContent value="stats">
              <StatisticsData gameStats={gameStats} />
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <AchievementsDetails achievements={achievements} />
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <UserSettings
                settings={settings}
                handleSettingChange={handleSettingChange}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
