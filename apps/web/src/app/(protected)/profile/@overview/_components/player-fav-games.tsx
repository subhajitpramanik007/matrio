"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Profile } from "@/types";
import { Target } from "lucide-react";

export function PlayerFavoriteGames({
  favoriteGame,
}: {
  favoriteGame: Profile["favoriteGame"];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="mr-2 h-5 w-5" />
          Favorite Games
        </CardTitle>
      </CardHeader>
      <CardContent>
        {favoriteGame ? (
          <div className="space-y-2">
            <div className="text-center">
              <div className="text-primary text-2xl font-bold">
                {favoriteGame}
              </div>
              <p className="text-muted-foreground text-sm">Most played game</p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-primary text-2xl font-bold">
              No favorite game
            </div>
            <p className="text-muted-foreground text-sm">No favorite game</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
