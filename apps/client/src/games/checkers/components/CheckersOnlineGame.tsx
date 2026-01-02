'use client'

import * as React from 'react'
import type { CheckersRoom } from '../checkers.types'

interface CheckersOnlineGameProps {
  room: CheckersRoom
}

export const CheckersOnlineGame: React.FC<CheckersOnlineGameProps> = ({ room }) => {
  return (
    <div>
      <p>CheckersOnlineGame</p>

      <p>{JSON.stringify(room, null, 2)}</p>
    </div>
  )
}
