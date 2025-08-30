"use client";

import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IProfile } from "@/types";

export function WelcomeSection({
  user,
}: {
  user: IProfile & {
    username: string;
  };
}) {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl">
            Welcome back, <span className="font-bold">{user.username}!</span>
          </h1>
          <p className="text-muted-foreground">
            Ready for another gaming session?
          </p>
        </div>
        <Badge variant="secondary" className="px-4 py-2 text-lg">
          Level {user.level}
        </Badge>
      </div>

      {/* XP Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Experience Points</span>
            <span className="text-muted-foreground text-sm">
              {user.xp} / {user.xpToNext} XP
            </span>
          </div>
          <Progress value={(user.xp / user.xpToNext) * 100} className="h-2" />
        </CardContent>
      </Card>
    </motion.div>
  );
}
