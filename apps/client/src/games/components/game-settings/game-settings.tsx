import { useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import { ArrowRightIcon } from 'lucide-react'

import {
  GameCostSelection,
  GameModeSelection,
  GameOnlineRoomSelection,
  GamePrivateRoomSelection,
} from '@/games/components/game-settings'
import { Button } from '@/components/ui/button'
import { useGameSettings } from '@/games/hooks/use-game-settings'

export const GameSettings: React.FC = () => {
  const { onReset } = useGameSettings()

  useEffect(() => {
    onReset()
  }, [])

  return (
    <div className="my-8 flex w-full items-center justify-center gap-8">
      <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-8">
        <AnimatePresence>
          <GameModeSelection key="game-mode-selection" />
          <GameOnlineRoomSelection key="game-online-room-selection" />
          <GamePrivateRoomSelection key="game-private-room-selection" />
          <GameCostSelection key="game-cost-selection" />
        </AnimatePresence>
        <div className="flex w-full items-center justify-end">
          <GameSettingContinueButton />
        </div>
      </div>
    </div>
  )
}

const GameSettingContinueButton: React.FC = () => {
  const {
    selectedMode,
    onlineGameOptions: { mode: onlineGameMode, roomType: onlineRoomType },
    onContinueToGame,
  } = useGameSettings()

  const isCanContinue =
    selectedMode !== 'online' || // not online
    onlineGameMode === 'public' || // public
    onlineRoomType // create or join

  return (
    <Button
      onClick={onContinueToGame}
      disabled={!isCanContinue}
      className="w-full max-w-3xs"
      color="orange"
    >
      Continue <ArrowRightIcon className="size-4" />
    </Button>
  )
}
