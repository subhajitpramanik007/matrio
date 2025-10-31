import { Target } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import type { AIGameDifficulty } from '@/games/tic-tac-toe/hooks/use-ai-game'

import { Container } from '@/components/common/container'
import { useTicTacToeAIGame } from '@/games/tic-tac-toe/hooks/use-ai-game'
import {
  TTTMenuButton,
  TTTScoreCard,
  TicTacToeBoard,
  TicTacToeBoardFooter,
} from '@/games/tic-tac-toe/components/common'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const AiGameWinMessage = {
  X: { text: 'You won! 🎉', className: 'text-primary font-semibold' },
  O: {
    text: 'AI wins this round',
    className: 'text-destructive font-semibold',
  },
  tie: { text: "It's a tie!", className: 'text-muted-foreground' },
}

export const AiCurrentPlayerMessage = {
  X: 'Your turn (X)',
  O: "AI's turn (O)",
}

export const AiModesDetails: Record<
  AIGameDifficulty,
  { title: string; description: string }
> = {
  easy: { title: 'Easy', description: 'Random moves' },
  medium: { title: 'Medium', description: 'Smart moves' },
  hard: { title: 'Hard', description: 'Perfect play' },
}

export function TicTacToeAiGame() {
  const navigate = useNavigate()
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
  } = useTicTacToeAIGame()

  return (
    <Container className="relative w-full py-8">
      <TTTMenuButton
        onNewGame={resetGame}
        onExit={() =>
          navigate({ to: '/games/$game', params: { game: 'tic-tac-toe' } })
        }
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
                    'AI is thinking...'
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
                    currentPlayer === 'O' ||
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
              firstPlayer={{ text: 'You (X)', score: score.player }}
              secondPlayer={{ text: 'AI (O)', score: score.ai }}
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
  )
}

function DifficultySelectForAi({
  gameMode,
  setGameMode,
  resetGame,
  isDisabled,
}: {
  gameMode: AIGameDifficulty
  setGameMode: (mode: AIGameDifficulty) => void
  resetGame: () => void
  isDisabled?: boolean
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
        {(['easy', 'medium', 'hard'] as AIGameDifficulty[]).map((mode) => (
          <Button
            key={mode}
            variant={gameMode === mode ? 'default' : 'outline'}
            className="w-full justify-start"
            onClick={() => {
              setGameMode(mode)
              resetGame()
            }}
            disabled={isDisabled}
          >
            <span>{AiModesDetails[mode].title}</span>
            <span className="ml-auto text-xs">
              {AiModesDetails[mode].description}
            </span>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
