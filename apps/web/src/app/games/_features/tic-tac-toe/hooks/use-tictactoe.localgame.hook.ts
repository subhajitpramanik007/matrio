"use client";

import { useContext } from "react";
import { TicTacToeLocalGameContext } from "../components/local/tictactoe.localgame.provider";

export const useLocalTicTacToe = () => {
  const context = useContext(TicTacToeLocalGameContext);
  if (!context) {
    throw new Error(
      "useLocalTicTacToe must be used within a TicTacToeLocalGameProvider",
    );
  }
  return context;
};
