"use client";

import { useGames } from "@/app/games/_lib/games.provider";
import {
  TicTacToeAiGame,
  TicTacToeLocalGame,
  TicTacToeLocalGameProvider,
} from "@games/tic-tac-toe/components";

export default function SingleGamePage() {
  const { gameAndMode } = useGames();

  switch (gameAndMode) {
    case "tic-tac-toe::local":
      return (
        <TicTacToeLocalGameProvider>
          <TicTacToeLocalGame />
        </TicTacToeLocalGameProvider>
      );
    case "tic-tac-toe::ai":
      return <TicTacToeAiGame />;
    case "tic-tac-toe::online":
    case "checkers::ai":
    case "checkers::local":
    case "checkers::online":
      return <div>Not implemented</div>;
    default:
      return <div>Select game mode</div>;
  }
}
