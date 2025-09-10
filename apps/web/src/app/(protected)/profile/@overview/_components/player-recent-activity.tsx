"use client";

import { motion } from "motion/react";
import { IProfileRecentActivity, ProfileGameHistoryPlayer } from "@/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GamepadIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { timeAgo } from "@/lib/utils";
import { useSession } from "@/hooks/auth";

export function PlayerRecentActivity({
  recentActivity = [],
}: {
  recentActivity: IProfileRecentActivity["gameHistory"];
}) {
  const { user } = useSession();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest gaming sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <RecentActivityCard
              key={index}
              activity={activity}
              idx={index}
              userId={user?.id || null}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const gameName: Record<string, string> = {
  TIC_TAC_TOE: "Tic Tac Toe",
  CHESS: "Chess",
  CHECKERS: "Checkers",
  SUDOKU: "Sudoku",
};

const gameResultBadgeVariant: Record<string, any> = {
  WIN: "default",
  LOSS: "destructive",
  TIE: "outline",
  PENDING: "outline",
  ABANDONED: "destructive",
};

function RecentActivityCard({
  activity,
  idx,
  userId,
}: {
  activity: IProfileRecentActivity["gameHistory"][0];
  idx: number;
  userId: string | null;
}) {
  const { game, opponentType, playedAt, players, result, xpGained } = activity;

  function getPlayersVs() {
    if (opponentType === "AI") {
      return " AI";
    }

    const opponentsUsername = (players as ProfileGameHistoryPlayer[])
      .filter((player) => player.id !== userId)
      .map((player) => player.username)
      .join(", ");

    return ` ${opponentsUsername}`;
  }

  const opponentsUsername = getPlayersVs();

  return (
    <motion.div
      className="bg-muted/30 flex items-center justify-between rounded-lg p-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.1 }}
    >
      <div className="flex items-center space-x-3">
        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
          <GamepadIcon className="text-primary h-5 w-5" />
        </div>
        <div>
          <p className="font-medium">{gameName[game]}</p>
          <p className="text-muted-foreground text-sm">
            {/* vs {activity.} */}
            vs {opponentsUsername}
          </p>
        </div>
      </div>
      <div className="text-right">
        <Badge variant={gameResultBadgeVariant[result]}>{result}</Badge>
        <p className="text-muted-foreground mt-1 text-xs">+{xpGained} XP</p>
        <p className="text-muted-foreground text-xs">{timeAgo(playedAt)}</p>
      </div>
    </motion.div>
  );
}
