"use client";

import { use } from "react";
import { DisplayThis } from "@/components/DisplayThis";

import TicTacToeAiGame from "@/games/tic-tac-toe/components/TTTAiGame";
import TicTacToeLocalGame from "@/games/tic-tac-toe/components/TTTLocalGame";

export default function TicTacToeGamePage({
  params,
}: {
  params: Promise<{ mode: string }>;
}) {
  const { mode } = use(params);

  return (
    <div>
      <DisplayThis when={mode === "ai"}>
        <TicTacToeAiGame />
      </DisplayThis>
      <DisplayThis when={mode === "local"}>
        <TicTacToeLocalGame />
      </DisplayThis>
    </div>
  );
}
