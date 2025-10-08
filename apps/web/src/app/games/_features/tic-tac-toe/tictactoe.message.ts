import { TTTAiGameMode, TTTSymbol } from "@/app/games/_features/tic-tac-toe/tictactoe.type";

export const AiGameWinMessage = {
  X: {
    text: "You won! 🎉",
    className: "text-primary font-semibold",
  },
  O: {
    text: "AI wins this round",
    className: "text-destructive font-semibold",
  },
  tie: { text: "It's a tie!", className: "text-muted-foreground" },
};

export const AiCurrentPlayerMessage = {
  X: "Your turn (X)",
  O: "AI's turn (O)",
};

export const AiModesDetails: Record<
  TTTAiGameMode,
  { title: string; description: string }
> = {
  "ai-easy": { title: "Easy", description: "Random moves" },
  "ai-medium": { title: "Medium", description: "Smart moves" },
  "ai-hard": { title: "Hard", description: "Perfect play" },
};

export const LocalGameMoveMessage: Record<TTTSymbol, string> = {
  X: "Player 1 turn (X)",
  O: "Player 2 turn (O)",
};

export const LocalGameWinMessage: Record<TTTSymbol | "tie", string> = {
  X: "Player 1 wins! 🎉",
  O: "Player 2 wins! 🎉",
  tie: "It's a tie! 🤝",
};
