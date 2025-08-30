"use client";

import { motion } from "motion/react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { IGameAchievement } from "@/types";

export function Achievements({
  achievements,
}: {
  achievements: IGameAchievement[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
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
    </motion.div>
  );
}
