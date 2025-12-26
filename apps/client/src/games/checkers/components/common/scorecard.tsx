import { motion } from 'motion/react'
import * as React from 'react'
import type { TCheckersPieceColor } from '@matrio/shared/checkers/types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ScorecardProps {
  result: {
    [key in TCheckersPieceColor]: number
  }
  currentPlayerColor: TCheckersPieceColor
}

export const CheckersScorecard: React.FC<ScorecardProps> = ({ result, currentPlayerColor }) => {
  return (
    <Card className="h-fit w-full md:max-w-xs">
      <CardHeader>Score board</CardHeader>
      <CardContent className="space-y-3">
        <PlayerScoreCard
          playerColor="red"
          noOfWins={result.red}
          isCurrentPlayer={currentPlayerColor === 'red'}
        />
        <PlayerScoreCard
          playerColor="black"
          noOfWins={result.black}
          isCurrentPlayer={currentPlayerColor === 'black'}
        />
      </CardContent>
    </Card>
  )
}

const PlayerScoreCard: React.FC<{
  playerColor: TCheckersPieceColor
  noOfWins: number
  isCurrentPlayer: boolean
}> = ({ isCurrentPlayer, playerColor, noOfWins }) => {
  return (
    <div
      className={cn(
        'bg-muted flex w-full items-center justify-between rounded-md px-4 py-2 font-semibold transition-all duration-100 ease-in-out',
        isCurrentPlayer && 'animate-pulse bg-orange-200',
        playerColor === 'red' && 'text-red-500',
        playerColor === 'black' && 'text-gray-500',
      )}
    >
      <span>Player 2({playerColor}):</span>
      <motion.div
        layoutId={playerColor}
        className={cn(
          'relative z-50 aspect-square w-12 skew-y-1 rounded-full border-4 bg-radial-[at_50%_75%] p-1',
          playerColor === 'red' && 'border-red-800 from-red-400 to-red-800',
          playerColor === 'black' && 'border-gray-900 from-gray-400 to-gray-900',
        )}
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
          {noOfWins}
        </span>
      </motion.div>
    </div>
  )
}
