"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { XPInfo } from "@/types";
import { Zap } from "lucide-react";

export function PlayerLevelProgress({ level, xp, xpToNext }: XPInfo) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="mr-2 h-5 w-5" />
          Level Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-primary text-3xl font-bold">Level {level}</div>
          <p className="text-muted-foreground text-sm">
            {xp} / {xpToNext} XP
          </p>
        </div>
        <Progress value={(xp / xpToNext) * 100} className="h-3" />
        <p className="text-muted-foreground text-center text-xs">
          {xpToNext - xp} XP to next level
        </p>
      </CardContent>
    </Card>
  );
}
