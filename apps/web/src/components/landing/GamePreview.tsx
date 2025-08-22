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

export const GamePreview: React.FC = ({}) => {
  return (
    <section className="container px-4 flex flex-col items-center py-16 min-h-screen bg-gradient-to-tl from-primary/10 to-primary/5">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Choose Your Game
        </h2>
        <p className="text-lg text-muted-foreground">
          Pick from our collection of beloved classic games
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-7xl justify-center mx-auto">
        <TicTacToePreview />
        <CheckersPreview />
      </div>
    </section>
  );
};

function TicTacToePreview() {
  return (
    <Card className="group w-full max-w-md hover:shadow-lg transition-all duration-300 cursor-pointer">
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
        <div className="grid grid-cols-3 gap-2 mb-6 max-w-48 mx-auto">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square border-2 border-border rounded-lg flex items-center justify-center text-2xl font-bold bg-card hover:bg-accent/10 transition-colors"
            >
              {i === 0 ? "X" : i === 4 ? "O" : i === 8 ? "X" : ""}
            </div>
          ))}
        </div>
        <Button className="w-full group-hover:bg-primary/90 transition-colors">
          Play Tic-Tac-Toe
        </Button>
      </CardContent>
    </Card>
  );
}

function CheckersPreview() {
  return (
    <Card className="group w-full max-w-md hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between h-full">
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
        <div className="grid grid-cols-4 gap-1 mb-6 max-w-48 mx-auto">
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
                    className={`w-6 h-6 rounded-full ${pieceColor} border-2 border-white`}
                  />
                )}
              </div>
            );
          })}
        </div>
        <Button className="w-full group-hover:bg-primary/90 transition-colors">
          Play Checkers
        </Button>
      </CardContent>
    </Card>
  );
}
