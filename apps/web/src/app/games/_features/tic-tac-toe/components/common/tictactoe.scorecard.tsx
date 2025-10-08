"use client";

import * as React from "react";

import { Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TTTScoreCardProps {
  firstPlayer: { score: number; text: string };
  secondPlayer: { score: number; text: string };
  ties: number;
  resetScore: () => void;
}

export const TTTScoreCard: React.FC<TTTScoreCardProps> = ({
  firstPlayer,
  secondPlayer,
  ties,
  resetScore,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="mr-2 h-5 w-5" />
          Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{firstPlayer.text}</span>
          <Badge variant="default" className="px-3 py-1 text-lg">
            {firstPlayer.score}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{secondPlayer.text}</span>
          <Badge variant="secondary" className="px-3 py-1 text-lg">
            {secondPlayer.score}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Ties</span>
          <Badge variant="outline" className="px-3 py-1 text-lg">
            {ties}
          </Badge>
        </div>
        <Button
          onClick={resetScore}
          variant="outline"
          className="mt-4 w-full bg-transparent"
        >
          Reset Score
        </Button>
      </CardContent>
    </Card>
  );
};
