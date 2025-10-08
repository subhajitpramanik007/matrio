"use client";

import { useState } from "react";

import {
  TTTAiGameMode,
  TTTSymbol,
  TTTCell,
} from "@/app/games/_features/tic-tac-toe/tictactoe.type";
import { WINNING_COMBINATIONS_TTT } from "@/app/games/_features/tic-tac-toe/tictactoe.constant";

export function useAiTTT() {
  const [board, setBoard] = useState<TTTCell[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<TTTSymbol | null>("X");
  const [winner, setWinner] = useState<TTTSymbol | "tie" | null>(null);
  const [gameMode, setGameMode] = useState<TTTAiGameMode>("ai-easy");
  const [score, setScore] = useState({ player: 0, ai: 0, ties: 0 });
  const [isAiThinking, setIsAiThinking] = useState(false);

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

  const getAiMove = (board: TTTCell[], difficulty: TTTAiGameMode): number => {
    const emptyCells = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((val) => val !== null) as number[];

    if (difficulty === "ai-easy") {
      // Random move
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    if (difficulty === "ai-medium") {
      // 70% chance of optimal move, 30% random
      if (Math.random() < 0.7) {
        return getBestMove(board);
      }
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    // Hard mode - always optimal
    return getBestMove(board);
  };

  const getBestMove = (board: TTTCell[]): number => {
    // Check if AI can win
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const testBoard = [...board];
        testBoard[i] = "O";
        if (checkWinner(testBoard) === "O") {
          return i;
        }
      }
    }

    // Check if AI needs to block player
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const testBoard = [...board];
        testBoard[i] = "X";
        if (checkWinner(testBoard) === "X") {
          return i;
        }
      }
    }

    // Take center if available
    if (board[4] === null) return 4;

    // Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter((i) => board[i] === null);
    if (availableCorners.length > 0) {
      return availableCorners[
        Math.floor(Math.random() * availableCorners.length)
      ];
    }

    // Take any available spot
    const emptyCells = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((val) => val !== null) as number[];
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner || currentPlayer === "O" || isAiThinking) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setCurrentPlayer("O");

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
      updateScore(gameResult);
      return;
    }

    // AI move
    setIsAiThinking(true);
    setTimeout(
      () => {
        const aiMove = getAiMove(newBoard, gameMode);
        const aiBoard = [...newBoard];
        aiBoard[aiMove] = "O";
        setBoard(aiBoard);
        setCurrentPlayer("X");
        setIsAiThinking(false);

        const aiGameResult = checkWinner(aiBoard);
        if (aiGameResult) {
          setWinner(aiGameResult);
          updateScore(aiGameResult);
        }
      },
      500 + Math.random() * 1000,
    );
  };

  const updateScore = (result: TTTCell | "tie") => {
    setScore((prev) => ({
      ...prev,
      player: result === "X" ? prev.player + 1 : prev.player,
      ai: result === "O" ? prev.ai + 1 : prev.ai,
      ties: result === "tie" ? prev.ties + 1 : prev.ties,
    }));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setIsAiThinking(false);
  };

  const resetScore = () => {
    setScore({ player: 0, ai: 0, ties: 0 });
    resetGame();
  };

  return {
    board,
    currentPlayer,
    winner,
    score,
    isAiThinking,
    gameMode,
    setGameMode,
    handleCellClick,
    resetGame,
    resetScore,
  };
}
