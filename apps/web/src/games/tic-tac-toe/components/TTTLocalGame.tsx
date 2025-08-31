"use client";

import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/Container";

import {
  TicTacToeBoard,
  TicTacToeBoardFooter,
  TTTScoreCard,
  TTTMenuButton,
} from "@/games/tic-tac-toe/components";
import {
  LocalGameMoveMessage,
  LocalGameWinMessage,
} from "@/games/tic-tac-toe/lib/messages.ttt";
import { useLocalTTT } from "@/games/tic-tac-toe/hooks";

export default function TicTacToeLocalGame() {
  const router = useRouter();
  const {
    board,
    currentPlayer,
    handleCellClick,
    resetGame,
    resetScore,
    score,
    winner,
  } = useLocalTTT();

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
                <CardTitle className="text-2xl">You vs You</CardTitle>
                <CardDescription>
                  {winner ? (
                    <span>{LocalGameWinMessage[winner]}</span>
                  ) : currentPlayer ? (
                    <span>{LocalGameMoveMessage[currentPlayer]}</span>
                  ) : null}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TicTacToeBoard
                  board={board}
                  handleCellClick={handleCellClick}
                  isDisabled={(index) => board[index] !== null}
                />
              </CardContent>
              <TicTacToeBoardFooter winner={winner} resetGame={resetGame} />
            </Card>
          </div>

          <div className="space-y-6">
            {/* Score Card */}
            <TTTScoreCard
              firstPlayer={{ text: "Player 1 (X)", score: score.first }}
              secondPlayer={{ text: "Player 2 (O)", score: score.second }}
              ties={score.ties}
              resetScore={resetScore}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
