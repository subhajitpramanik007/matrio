import type { TGameOnlineMode } from '@/games/types/game.types'

import {
  GameSettingOptions,
  GameSettingOptionsButton,
  GameSettingOptionsSection,
  GameSettingOptionsTitle,
  GameSettingOptionsWrapper,
} from '@/games/components/game-settings'

import { DisplayThis } from '@/components/display-this'
import { useGameSettings } from '@/games/hooks'
import { GAME_ONLINE_MODE } from '@/games/game.constant'
import { DisplayArray } from '@/components/display-array'
import { useOptionsAnimation } from '@/hooks/use-options-animation'
import { HoverMotion } from '@/components/hover-motion'

const onlineRoomTypeOptionsLabel: Record<TGameOnlineMode, string> = {
  private: 'Play with Friends',
  public: 'Play with Random Players',
}

export function GameOnlineRoomSelection() {
  const { selectedMode } = useGameSettings()

  const isCanDisplay = selectedMode === 'online'

  return (
    <DisplayThis when={isCanDisplay}>
      <GameSettingOptionsWrapper>
        <GameSettingOptionsSection>
          <GameSettingOptionsTitle>
            Select Online Room Type
          </GameSettingOptionsTitle>
          <GameSettingOptions>
            <GamePrivateRoomSelectionContent />
          </GameSettingOptions>
        </GameSettingOptionsSection>
      </GameSettingOptionsWrapper>
    </DisplayThis>
  )
}

function GamePrivateRoomSelectionContent() {
  const {
    onlineGameOptions: { mode: onlineGameMode },
    setOnlineGameMode,
  } = useGameSettings()

  const { currentIdx, onMouseEnter, onMouseLeave } = useOptionsAnimation()

  return (
    <DisplayArray
      array={GAME_ONLINE_MODE}
      className="flex gap-3"
      render={(mode, idx) => (
        <div className="relative">
          <GameSettingOptionsButton
            key={mode}
            isSelected={onlineGameMode === mode}
            onClick={() => setOnlineGameMode(mode)}
            onMouseEnter={() => onMouseEnter(idx)}
            onMouseLeave={onMouseLeave}
          >
            <HoverMotion
              idx={idx}
              currentIdx={currentIdx}
              layoutId="hover-button-online-room-type"
            />
            {onlineRoomTypeOptionsLabel[mode]}
          </GameSettingOptionsButton>
        </div>
      )}
    />
  )
}
