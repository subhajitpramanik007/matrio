"use client";

import { GamepadIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "motion/react";
import { IGameRecentActivity } from "@/types";
import { Badge } from "@/components/ui/badge";

export function PlayerRecentActivity({
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
