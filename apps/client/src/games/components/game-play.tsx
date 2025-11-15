import * as React from 'react'
import { useLoaderData } from '@tanstack/react-router'

import type { TGameModeCombination } from '@/games/types/game.types'
import { GameNotImplement } from '@/games/components/not-implement'
import { Container } from '@/components/common/container'
import { useCheckSettingDone } from '@/games/hooks'

import { TicTacToeAiGame } from '@/games/tic-tac-toe/components/ai-game'
import { TicTacToeLocalGame } from '@/games/tic-tac-toe/components/local-game'
import { TicTacToeOnlineGame } from '@/games/tic-tac-toe/components/online/online-game'
import { CheckersOnlineGame } from '@/games/checkers/components/online-game/online-game'
import CheckersLocalGame from '@/games/checkers/components/local'

type TGamePlayComponent = Partial<Record<TGameModeCombination, React.FC>>

const GamePlayComponent: TGamePlayComponent = {
  'tic-tac-toe:local': TicTacToeLocalGame,
  'tic-tac-toe:online': TicTacToeOnlineGame,
  'tic-tac-toe:ai': TicTacToeAiGame,
  'checkers:online': CheckersOnlineGame,
  'checkers:local': CheckersLocalGame,
}

export const GamePlay: React.FC = () => {
  const { gameSlug, mode } = useLoaderData({ from: '/games/$game/$mode' })

  const [isReady, setIsReady] = React.useState(false)
  useCheckSettingDone(() => setIsReady(true))

  if (!isReady) return null

  const gameKey: TGameModeCombination = `${gameSlug}:${mode}`
  const GameComponent = GamePlayComponent[gameKey]

  return (
    <Container className="w-full max-w-7xl py-4">
      {GameComponent ? <GameComponent /> : <GameNotImplement gameSlug={gameSlug} mode={mode} />}
    </Container>
  )
}
