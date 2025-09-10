"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useGameActivities } from "@/hooks/profile/useGameActivities";
import { ProfileGameHistory, ProfileGameHistoryPlayer } from "@/types";
import { useSession } from "@/hooks/auth";
import { timeAgo } from "@/lib/utils";

export default function RecentGamesSection() {
  const { user } = useSession();
  const { data } = useGameActivities();

  const recentGames = data?.data.gameHistory || [];

  return (
    <React.Fragment>
      <h2 className="mb-6 text-2xl font-bold">Recent Games</h2>
      <Card>
        <CardContent className="p-0">
          {recentGames.map((game, index) => (
            <GameCard
              key={index}
              activity={game}
              userId={user?.id ?? null}
              idx={index}
            />
          ))}
        </CardContent>
      </Card>
    </React.Fragment>
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

function GameCard({
  activity,
  userId,
}: {
  activity: ProfileGameHistory;
  userId: string | null;
  idx: number;
}) {
  const { game, opponentType, playedAt, players, result } = activity;

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
    <div className="border-border flex items-center justify-between border-b p-4 last:border-b-0">
      <div className="flex items-center space-x-4">
        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
          <span className="text-primary text-sm font-bold">
            {game.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-medium">{gameName[game]}</p>
          <p className="text-muted-foreground text-sm">
            vs {opponentsUsername}
          </p>
        </div>
      </div>
      <div className="text-right">
        <Badge variant={gameResultBadgeVariant[result]}>{result}</Badge>
        <p className="text-muted-foreground mt-1 text-xs">
          {timeAgo(playedAt)}
        </p>
      </div>
    </div>
  );
}
