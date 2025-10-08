"use client";

import { createContext, useState } from "react";
import { TTTCell, TTTSymbol } from "@games/tic-tac-toe/tictactoe.type";
import { WINNING_COMBINATIONS_TTT } from "../../tictactoe.constant";

interface TicTacToeLocalGameContext {
  board: TTTCell[];
  currentPlayer: TTTSymbol | null;
  winner: TTTSymbol | "tie" | null;
  score: { first: number; second: number; ties: number };
  resetGame: () => void;
  resetScore: () => void;
  handleCellClick: (index: number) => void;
}

export const TicTacToeLocalGameContext =
  createContext<TicTacToeLocalGameContext>({
    board: [],
    currentPlayer: null,
    winner: null,
    score: { first: 0, second: 0, ties: 0 },
    resetGame: () => {},
    resetScore: () => {},
    handleCellClick: () => {},
  });

export const TicTacToeLocalGameProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
  return (
    <TicTacToeLocalGameContext.Provider
      value={{
        board,
        currentPlayer,
        winner,
        score,
        resetGame,
        resetScore,
        handleCellClick,
      }}
    >
      {children}
    </TicTacToeLocalGameContext.Provider>
  );
};
