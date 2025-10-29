import * as React from 'react'
import { useSingleGameLoaderData } from '@/games/hooks'

const SingleGame: React.FC = () => {
  const { gameSlug } = useSingleGameLoaderData()

  return (
    <div>
      <h1>Single Game: {gameSlug}</h1>
    </div>
  )
}

export default SingleGame
