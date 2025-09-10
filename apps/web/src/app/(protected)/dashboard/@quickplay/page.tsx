import React from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { TicTacToePreviewDisplay } from "@/components/TicTacToePreviewDisplay";
import { CheckersPreviewDisplay } from "@/components/CheckersPreviewDisplay";

const Games = [
  {
    name: "Tic-Tac-Toe",
    tagline: "The classic 3x3 grid game",
    tag: "Quick",
    display: React.createElement(TicTacToePreviewDisplay),
    link: "/games/tic-tac-toe",
  },
  {
    name: "Checkers",
    tagline: "Classic board game for 2 players",
    tag: "Strategy",
    display: React.createElement(CheckersPreviewDisplay),
    link: "/games/checkers",
  },
];

export default function QuickPlaySection() {
  return (
    <>
      <h2 className="mb-6 text-2xl font-bold">Quick Play</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {Games.map((game, index) => (
          <Card
            key={index}
            className="group cursor-pointer transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{game.name}</CardTitle>
                <Badge>{game.tag}</Badge>
              </div>
              <CardDescription>{game.tagline}</CardDescription>
            </CardHeader>
            <CardContent>
              {game.display}
              <Link href={game.link}>
                <Button className="w-full">Play Now</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
