import { useLoaderData } from '@tanstack/react-router'
import type { Game, GameNamespaceToSocket, GameSlug } from '@/games/common/types'
import { slugToTitle, slugify } from '@/lib/utils'

interface IGameData {
  game: Game
  gameSlug: GameSlug
  gameNamespaceToSocket: GameNamespaceToSocket
}

export const useGame = (): IGameData => {
  const { gameSlug } = useLoaderData({ from: '/games/$game' })

  const game = slugToTitle(gameSlug) as Game
  const gameNamespaceToSocket = slugify(game, '_')

  return {
    game,
    gameSlug,
    gameNamespaceToSocket,
  }
}
