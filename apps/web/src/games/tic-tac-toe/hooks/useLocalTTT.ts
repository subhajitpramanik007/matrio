"use client";

import { useState } from "react";

import { WINNING_COMBINATIONS_TTT } from "@/games/tic-tac-toe/lib/constant.ttt";
import { TTTSymbol, TTTCell } from "@/games/tic-tac-toe/lib/types.ttt";

export const useLocalTTT = () => {
  const [board, setBoard] = useState<TTTCell[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<TTTSymbol | null>("X");
  const [winner, setWinner] = useState<TTTSymbol | "tie" | null>(null);
  const [score, setScore] = useState({ first: 0, second: 0, ties: 0 });

  const checkWinner = (board: TTTCell[]): TTTSymbol | "tie" | null => {
    for (const combination of WINNING_COMBINATIONS_TTT) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (board.every((cell) => cell !== null)) {
      return "tie";
    }

    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  const resetScore = () => {
    setScore({ first: 0, second: 0, ties: 0 });
    resetGame();
  };

  const updateScore = (result: TTTCell | "tie") => {
    setScore((prev) => ({
      ...prev,
      first: result === "X" ? prev.first + 1 : prev.first,
      second: result === "O" ? prev.second + 1 : prev.second,
      ties: result === "tie" ? prev.ties + 1 : prev.ties,
    }));
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer === "X" ? "X" : "O";
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
      updateScore(gameResult);
      return;
    }
  };

  return {
    board,
    currentPlayer,
    winner,
    score,
    resetGame,
    resetScore,
    handleCellClick,
  };
};
