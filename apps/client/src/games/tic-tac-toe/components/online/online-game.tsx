import * as React from 'react'

import { OnlineTicTacToeManager } from './manager'
import { OnlineTicTacToeProvider } from '@/games/tic-tac-toe/context/online-game'
import { TicTacToeSocketListenerLayer } from '@/games/tic-tac-toe/components/online/socket-listener-layer'

export const TicTacToeOnlineGame: React.FC = () => {
  return (
    <OnlineTicTacToeProvider>
      <TicTacToeSocketListenerLayer>
        <OnlineTicTacToeManager />
      </TicTacToeSocketListenerLayer>
    </OnlineTicTacToeProvider>
  )
}
