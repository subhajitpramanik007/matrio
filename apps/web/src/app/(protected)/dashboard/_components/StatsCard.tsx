"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IGameStats } from "@/types";

export function StatsCard({ gameStats }: { gameStats: IGameStats }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Games Played</span>
            <span className="font-bold">{gameStats.totalGames}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Win Rate</span>
            <span className="text-primary font-bold">{gameStats.winRate}%</span>
          </div>
          {/* <div className="flex justify-between">
            <span className="text-muted-foreground">Current Level</span>
            <span className="font-bold">{user.level}</span>
          </div> */}
        </CardContent>
      </Card>
    </motion.div>
  );
}
