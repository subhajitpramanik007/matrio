import { TTTAiGameMode } from "./tictactoe.type";

export const WINNING_COMBINATIONS_TTT = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

export const AI_MODE_TTT: TTTAiGameMode[] = [
  "ai-easy",
  "ai-medium",
  "ai-hard",
] as const;
