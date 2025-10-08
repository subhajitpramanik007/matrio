import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const GamePreview: React.FC = ({}) => {
  return (
    <section className="from-primary/10 to-primary/5 container flex min-h-screen flex-col items-center bg-gradient-to-tl px-4 py-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Choose Your Game
        </h2>
        <p className="text-muted-foreground text-lg">
          Pick from our collection of beloved classic games
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-8 md:flex-row">
        <TicTacToePreview />
        <CheckersPreview />
      </div>
    </section>
  );
};

function TicTacToePreview() {
  return (
    <Card className="group w-full max-w-md cursor-pointer transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Tic-Tac-Toe</CardTitle>
          <Badge>Quick Play</Badge>
        </div>
        <CardDescription>
          The classic 3x3 grid game. Get three in a row to win! Play against
          your friends.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mx-auto mb-6 grid max-w-48 grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="border-border bg-card hover:bg-accent/10 flex aspect-square items-center justify-center rounded-lg border-2 text-2xl font-bold transition-colors"
            >
              {i === 0 ? "X" : i === 4 ? "O" : i === 8 ? "X" : ""}
            </div>
          ))}
        </div>
        <Button className="group-hover:bg-primary/90 w-full transition-colors">
          <Link href="/games/tic-tac-toe">Play Tic-Tac-Toe</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function CheckersPreview() {
  return (
    <Card className="group flex h-full w-full max-w-md cursor-pointer flex-col justify-between transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Checkers</CardTitle>
          <Badge variant="secondary">Strategy</Badge>
        </div>
        <CardDescription>
          Classic board game of strategy and skill. Capture all opponent pieces!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mx-auto mb-6 grid max-w-48 grid-cols-4 gap-1">
          {Array.from({ length: 16 }).map((_, i) => {
            const isEven = Math.floor(i / 4) % 2 === 0;
            const isDark = isEven ? i % 2 === 1 : i % 2 === 0;
            const hasPiece = i < 6 || i > 9;
            const pieceColor = i < 6 ? "bg-red-500" : "bg-gray-800";

            return (
              <div
                key={i}
                className={`aspect-square ${
                  isDark ? "bg-gray-700" : "bg-gray-200"
                } flex items-center justify-center`}
              >
                {hasPiece && isDark && (
                  <div
                    className={`h-6 w-6 rounded-full ${pieceColor} border-2 border-white`}
                  />
                )}
              </div>
            );
          })}
        </div>
        <Button className="group-hover:bg-primary/90 w-full transition-colors">
          Play Checkers
        </Button>
      </CardContent>
    </Card>
  );
}
