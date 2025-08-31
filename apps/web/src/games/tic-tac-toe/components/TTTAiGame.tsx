"use client";

import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/Container";
import { Target } from "lucide-react";

import {
  TicTacToeBoard,
  TicTacToeBoardFooter,
  TTTScoreCard,
  TTTMenuButton,
} from "@/games/tic-tac-toe/components";
import {
  AiCurrentPlayerMessage,
  AiGameWinMessage,
  AiModesDetails,
} from "@/games/tic-tac-toe/lib/messages.ttt";
import { useAiTTT } from "@/games/tic-tac-toe/hooks";
import { TTTAiGameMode } from "@/games/tic-tac-toe/lib/types.ttt";

export default function TicTacToeAiGame() {
  const router = useRouter();
  const {
    board,
    currentPlayer,
    gameMode,
    setGameMode,
    score,
    handleCellClick,
    isAiThinking,
    resetGame,
    resetScore,
    winner,
  } = useAiTTT();

  return (
    <Container className="relative w-full py-8">
      <TTTMenuButton
        onNewGame={resetGame}
        onExit={() => router.push("/games/tic-tac-toe")}
      />
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">You vs AI</CardTitle>
                <CardDescription>
                  {winner ? (
                    <span className={AiGameWinMessage[winner].className}>
                      {AiGameWinMessage[winner].text}
                    </span>
                  ) : isAiThinking ? (
                    "AI is thinking..."
                  ) : currentPlayer ? (
                    <span>{AiCurrentPlayerMessage[currentPlayer]}</span>
                  ) : null}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TicTacToeBoard
                  board={board}
                  handleCellClick={handleCellClick}
                  isDisabled={(idx) =>
                    !!board[idx] ||
                    !!winner ||
                    currentPlayer === "O" ||
                    isAiThinking
                  }
                />
              </CardContent>
              <CardFooter>
                <TicTacToeBoardFooter winner={winner} resetGame={resetGame} />
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Score Card */}
            <TTTScoreCard
              firstPlayer={{ text: "You (X)", score: score.player }}
              secondPlayer={{ text: "AI (O)", score: score.ai }}
              ties={score.ties}
              resetScore={resetScore}
            />

            {/* Difficulty Settings */}
            <DifficultySelectForAi
              gameMode={gameMode}
              setGameMode={setGameMode}
              resetGame={resetGame}
              isDisabled={!winner && board.some((cell) => cell !== null)}
            />

            {/* Game Tips */}
            {/* <GameTipsCard /> */}
          </div>
        </div>
      </div>
    </Container>
  );
}

function DifficultySelectForAi({
  gameMode,
  setGameMode,
  resetGame,
  isDisabled,
}: {
  gameMode: TTTAiGameMode;
  setGameMode: (mode: TTTAiGameMode) => void;
  resetGame: () => void;
  isDisabled?: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="mr-2 h-5 w-5" />
          Difficulty
        </CardTitle>
        <CardDescription>Choose your challenge level</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {(["ai-easy", "ai-medium", "ai-hard"] as TTTAiGameMode[]).map(
          (mode) => (
            <Button
              key={mode}
              variant={gameMode === mode ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => {
                setGameMode(mode);
                resetGame();
              }}
              disabled={isDisabled}
            >
              <span>{AiModesDetails[mode].title}</span>
              <span className="ml-auto text-xs">
                {AiModesDetails[mode].description}
              </span>
            </Button>
          ),
        )}
      </CardContent>
    </Card>
  );
}
