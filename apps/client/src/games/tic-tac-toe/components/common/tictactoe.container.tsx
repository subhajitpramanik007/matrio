import { useLoaderData, useNavigate } from '@tanstack/react-router'
import type { ChildrenProps } from '@/types'
import { Container } from '@/components/common/container'
import { TTTMenuButton } from '@/games/tic-tac-toe/components/common'

interface TicTacToeContainerProps extends ChildrenProps {
  resetGame: () => void
}

export const TicTacToeContainer = ({
  children,
  resetGame,
}: TicTacToeContainerProps) => {
  const navigate = useNavigate()
  const { gameSlug } = useLoaderData({ from: '/games/$game/$mode' })

  return (
    <Container className="relative w-full py-8">
      <TTTMenuButton
        onNewGame={resetGame}
        onExit={() =>
          navigate({ to: '/games/$game', params: { game: gameSlug } })
        }
      />
      {children}
    </Container>
  )
}
