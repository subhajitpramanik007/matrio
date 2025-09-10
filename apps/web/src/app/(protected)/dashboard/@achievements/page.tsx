"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useAchievements } from "@/hooks/profile/useAchievements";

export default function Achievements() {
  const { data: achievementsData } = useAchievements();

  const achievements = achievementsData?.data?.achievements || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
        <CardDescription>Your gaming milestones</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 rounded-lg p-2 ${
              achievement.unlocked ? "bg-primary/10" : "bg-muted/50"
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                achievement.unlocked
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {achievement.unlocked ? "✓" : "?"}
            </div>
            <div className="flex-1">
              <p
                className={`text-sm font-medium ${!achievement.unlocked && "text-muted-foreground"}`}
              >
                {achievement.title}
              </p>
              <p className="text-muted-foreground text-xs">
                {achievement.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
