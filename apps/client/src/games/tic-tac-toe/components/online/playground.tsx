import * as React from 'react'
import { RotateCcwIcon, TrophyIcon } from 'lucide-react'

import { TTTMenuButton, TicTacToeBoard } from '../common'
import {
  useGameResult,
  useOnlineGame,
  useOnlineGameManager,
  usePlayerTurn,
  usePlayers,
} from '@/games/tic-tac-toe/hooks/use-online-game'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const OnlineTicTacToePlayground: React.FC = () => {
  return (
    <div className="relative px-4">
      <TTTMenuButton onExit={() => {}} onNewGame={() => {}} />
      <div className="flex flex-col gap-8 pt-16 md:ml-20 md:flex-row md:pt-0">
        <GameBoardContainer />
        <GameScoreCard />
      </div>
    </div>
  )
}

function GameBoardContainer() {
  const { room, player, gameResult } = useOnlineGame()
  const { handlePlayerMove, handleRestartGame } = useOnlineGameManager()

  const { vsText } = usePlayers()
  const { turnMessage } = usePlayerTurn(player, room.turn)
  const { isGameOver, resultType, resultDetails } = useGameResult(
    player.id,
    gameResult,
  )

  return (
    <Card className="w-full max-w-4xl px-8 lg:col-span-2">
      <CardHeader className="text-center">
        <CardTitle className="flex w-full justify-center">{vsText}</CardTitle>
        <CardDescription className={resultDetails?.className}>
          <span>
            {resultType !== 'none' ? resultDetails?.message : turnMessage}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TicTacToeBoard
          board={room.board}
          handleCellClick={handlePlayerMove}
          isDisabled={(index) => room.board[index] !== null}
          winningLine={gameResult?.winningLine}
        />
      </CardContent>
      <CardFooter className="flex w-full justify-center gap-6">
        {isGameOver ? (
          <Button onClick={handleRestartGame}>
            <RotateCcwIcon className="size-4" />
            Play Again{' '}
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  )
}

function GameScoreCard() {
  const { firstPlayer, secondPlayer, myIndex } = usePlayers()

  return (
    <Card className="h-fit w-full md:max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrophyIcon className="mr-2 h-5 w-5" />
          Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <PlayerWinRow
          key={firstPlayer.id}
          username={myIndex === 'first' ? 'You' : firstPlayer.username}
          symbol={firstPlayer.symbol}
          noOfWins={firstPlayer.noOfWins}
        />
        <PlayerWinRow
          key={secondPlayer.id}
          username={myIndex === 'second' ? 'You' : secondPlayer.username}
          symbol={secondPlayer.symbol}
          noOfWins={secondPlayer.noOfWins}
        />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Ties</span>
          <Badge variant="outline" className="px-3 py-1 text-lg">
            {firstPlayer.noOfDraws}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function PlayerWinRow(props: {
  symbol: string
  noOfWins: number
  username: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground space-x-2">
        <span>{props.username}</span>
        <span>({props.symbol})</span>
      </div>
      <Badge variant="default" className="px-3 py-1 text-lg">
        {props.noOfWins}
      </Badge>
    </div>
  )
}
