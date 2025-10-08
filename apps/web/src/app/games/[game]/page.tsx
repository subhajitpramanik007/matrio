"use client";

import { Button } from "@/components/ui/button";
import { useGames } from "@/app/games/_lib/games.provider";
import { BotIcon, Users2Icon } from "lucide-react";

export default function SingleGamePage() {
  const { setMode } = useGames();

  return (
    <div className="flex w-full items-center justify-center py-8">
      <div className="flex w-full max-w-xs flex-col gap-8">
        <h1 className="text-primary/80 text-2xl font-bold">Select Game Mode</h1>
        <div className="flex flex-col justify-center gap-6">
          <Button
            className="text-md w-full bg-blue-700 font-semibold text-blue-100 hover:bg-blue-600 hover:text-blue-50"
            onClick={() => setMode("online")}
          >
            <Users2Icon className="mr-2 size-5" />
            Online Multi-Player
          </Button>
          <Button
            className="text-md w-full bg-green-700 font-semibold text-green-100 hover:bg-green-600 hover:text-green-50"
            onClick={() => setMode("local")}
          >
            <Users2Icon className="mr-2 size-5" />
            Local Multi-Player
          </Button>
          <Button
            className="text-md w-full bg-orange-700 font-semibold text-orange-100 hover:bg-orange-600 hover:text-orange-50"
            onClick={() => setMode("ai")}
          >
            <BotIcon className="mr-2 size-5" />
            Player vs AI
          </Button>
        </div>
      </div>
    </div>
  );
}
