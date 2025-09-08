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
import { Achievement } from "@/types";
import { cn } from "@/lib/utils";
import { useAchievements } from "@/hooks/profile/useAchievements";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const AchievementsDetails: React.FC = () => {
  const { data } = useAchievements();

  const achievementsData = data?.data.achievements;
  const noOfAchievements = achievementsData?.length;
  const noOfUnlocked = achievementsData?.filter((a) => a.unlocked).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="mr-2 h-5 w-5" />
          Achievements
        </CardTitle>
        <CardDescription>
          {noOfUnlocked} of {noOfAchievements} unlocked
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {achievementsData.map((achievement, idx) => (
            <AchievementRewardDetailsTooltip
              key={idx}
              rewardData={achievement.reward}
            >
              <AchievementsDetailsCard achievement={achievement} idx={idx} />
            </AchievementRewardDetailsTooltip>
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
  achievement: Achievement;
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
          {achievement.unlocked && achievement.unlockedAt && (
            <p className="text-primary text-xs">
              Unlocked on{" "}
              {new Date(achievement.unlockedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function AchievementRewardDetailsTooltip({
  rewardData,
  children,
}: {
  rewardData: Achievement["reward"];
  children: React.ReactNode;
}) {
  const title = rewardData.name.split("_").join(" ");
  const { description, coins, xp, xpMultiplierAdd } = rewardData;

  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>
        <div className="space-y-1 p-1">
          <h3 className="font-semibold">{title}</h3>
          {description && <p>{description}</p>}
          <div>
            <span>{coins} coins </span>
            <span>, </span>
            <span>{xp} xp</span>
          </div>
          <div>
            {xpMultiplierAdd ? (
              <p>
                <span>{xpMultiplierAdd.value} xp multiplier </span>
                <span>
                  {xpMultiplierAdd.isPermanent
                    ? "Permanent"
                    : xpMultiplierAdd.expirationLimit
                      ? `Expires in ${xpMultiplierAdd.expirationLimit / 1000 / 60 / 60} hours`
                      : ""}
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
