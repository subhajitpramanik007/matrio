import type { TicTacToeCell, TicTacToeSymbol } from '@/games/tic-tac-toe/types'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  TTTScoreCard,
  TicTacToeBoard,
  TicTacToeBoardFooter,
  TicTacToeContainer,
} from '@/games/tic-tac-toe/components/common'
import {
  TicTacToeLocalGameProvider,
  useTicTacToeLocalGame,
} from '@/games/tic-tac-toe/context/local-game'

export function TicTacToeLocalGame() {
  return (
    <TicTacToeLocalGameProvider>
      <TicTacToeLocalGamePlay />
    </TicTacToeLocalGameProvider>
  )
}

const TicTacToeLocalGamePlay = () => {
  const data = useTicTacToeLocalGame()

  const { score, resetGame, resetScore } = data

  return (
    <TicTacToeContainer resetGame={resetGame}>
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Game Board */}
          <TicTacToeLocalGameBoard {...data} />

          <div className="space-y-6">
            {/* Score Card */}
            <TTTScoreCard
              firstPlayer={{ text: 'Player 1 (X)', score: score.first }}
              secondPlayer={{ text: 'Player 2 (O)', score: score.second }}
              ties={score.ties}
              resetScore={resetScore}
            />
          </div>
        </div>
      </div>
    </TicTacToeContainer>
  )
}
export const LocalGameMoveMessage: Record<TicTacToeSymbol, string> = {
  X: 'Player 1 turn (X)',
  O: 'Player 2 turn (O)',
}

export const LocalGameWinMessage: Record<TicTacToeSymbol | 'tie', string> = {
  X: 'Player 1 wins! 🎉',
  O: 'Player 2 wins! 🎉',
  tie: "It's a tie! 🤝",
}

function TicTacToeLocalGameBoard(props: {
  board: TicTacToeCell[]
  currentPlayer: TicTacToeSymbol | null
  handleCellClick: (index: number) => void
  winner: TicTacToeSymbol | 'tie' | null
  resetGame: () => void
}) {
  const { board, currentPlayer, handleCellClick, winner, resetGame } = props
  return (
    <div className="lg:col-span-2">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">You vs Other</CardTitle>
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
  )
}
