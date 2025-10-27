import * as React from 'react'
import { useLoaderData } from '@tanstack/react-router'

const SingleGame: React.FC = () => {
  const { game } = useLoaderData({ from: '/games/$game/' })

  return (
    <div>
      <h1>Single Game: {game}</h1>
    </div>
  )
}

export default SingleGame
