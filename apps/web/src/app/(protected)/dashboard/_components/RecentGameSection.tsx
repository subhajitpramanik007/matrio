"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IGameRecentActivity } from "@/types";

export function RecentGamesSection({
  recentGames,
}: {
  recentGames: IGameRecentActivity[];
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="mb-6 text-2xl font-bold">Recent Games</h2>
      <Card>
        <CardContent className="p-0">
          {recentGames.map((game, index) => (
            <div
              key={index}
              className="border-border flex items-center justify-between border-b p-4 last:border-b-0"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <span className="text-primary text-sm font-bold">
                    {game.game === "Tic-Tac-Toe" ? "T" : "C"}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{game.game}</p>
                  <p className="text-muted-foreground text-sm">
                    vs {game.opponent}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge
                  variant={game.result === "Won" ? "default" : "destructive"}
                >
                  {game.result}
                </Badge>
                <p className="text-muted-foreground mt-1 text-xs">
                  {game.date}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.section>
  );
}
