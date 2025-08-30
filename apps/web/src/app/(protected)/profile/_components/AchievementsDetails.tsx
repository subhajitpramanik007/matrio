"use client";

import * as React from "react";

import { motion } from "motion/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CrownIcon, Trophy } from "lucide-react";
import { IGameAchievement } from "@/types";
import { cn } from "@/lib/utils";

interface AchievementsDetailsProps {
  achievements: IGameAchievement[];
}

export const AchievementsDetails: React.FC<AchievementsDetailsProps> = ({
  achievements,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="mr-2 h-5 w-5" />
          Achievements
        </CardTitle>
        <CardDescription>
          {achievements.filter((a) => a.unlocked).length} of{" "}
          {achievements.length} unlocked
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {achievements.map((achievement, idx) => (
            <AchievementsDetailsCard
              key={idx}
              achievement={achievement}
              idx={idx}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

function AchievementsDetailsCard({
  idx,
  achievement,
}: {
  idx: number;
  achievement: IGameAchievement;
}) {
  return (
    <motion.div
      className={cn(
        "rounded-lg border p-4",
        achievement.unlocked
          ? "bg-primary/5 border-primary/20"
          : "bg-muted/30 border-border opacity-60",
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
    >
      <div className="flex items-start space-x-3">
        <div
          className={cn(
            "flex size-12 items-center justify-center rounded-full",
            achievement.unlocked
              ? "bg-primary text-primary-foreground"
              : "bg-muted",
          )}
        >
          {achievement.unlocked ? (
            <CrownIcon className="h-6 w-6" />
          ) : (
            <Trophy className="h-6 w-6" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{achievement.title}</h3>
          <p className="text-muted-foreground mb-2 text-sm">
            {achievement.description}
          </p>
          {achievement.unlocked && achievement.date && (
            <p className="text-primary text-xs">
              Unlocked on {achievement.date}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
