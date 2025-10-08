"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  TicTacToeBoard,
  TicTacToeBoardFooter,
  TicTacToeContainer,
  TTTScoreCard,
} from "@games/tic-tac-toe/components";
import {
  LocalGameMoveMessage,
  LocalGameWinMessage,
} from "@games/tic-tac-toe/tictactoe.message";
import { useLocalTicTacToe } from "@games/tic-tac-toe/hooks";

export const TicTacToeLocalGame = () => {
  const { resetGame, resetScore, score } = useLocalTicTacToe();

  return (
    <TicTacToeContainer resetGame={resetGame}>
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Game Board */}
          <TicTacToeLocalGameBoard />

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
    </TicTacToeContainer>
  );
};

function TicTacToeLocalGameBoard() {
  const { board, currentPlayer, handleCellClick, winner, resetGame } =
    useLocalTicTacToe();
  return (
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
  );
}
