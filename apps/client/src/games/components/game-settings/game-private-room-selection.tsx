import type { TGamePrivateRoomAction } from '@/games/types/game.types'

import {
  GameSettingOptions,
  GameSettingOptionsButton,
  GameSettingOptionsSection,
  GameSettingOptionsTitle,
  GameSettingOptionsWrapper,
} from '@/games/components/game-settings'

import { DisplayThis } from '@/components/display-this'
import { useGameSettings } from '@/games/hooks'

import { DisplayArray } from '@/components/display-array'
import { useOptionsAnimation } from '@/hooks/use-options-animation'
import { HoverMotion } from '@/components/hover-motion'
import { GAME_PRIVATE_ROOM_ACTION } from '@/games/game.constant'

const privateRoomTypeOptionsLabel: Record<TGamePrivateRoomAction, string> = {
  create: 'Create Private Room',
  join: 'Join Private Room',
}

export function GamePrivateRoomSelection() {
  const {
    selectedMode,
    onlineGameOptions: { mode: onlineGameMode },
  } = useGameSettings()

  const isCanDisplay = selectedMode === 'online' && onlineGameMode === 'private'

  return (
    <DisplayThis when={isCanDisplay}>
      <GameSettingOptionsWrapper>
        <GameSettingOptionsSection>
          <GameSettingOptionsTitle>
            Do you want to create or join a private room?
          </GameSettingOptionsTitle>
          <GameSettingOptions>
            <GamePrivateRoomSelectionContent />
          </GameSettingOptions>
        </GameSettingOptionsSection>
      </GameSettingOptionsWrapper>
    </DisplayThis>
  )
}

const GamePrivateRoomSelectionContent: React.FC = () => {
  const {
    onlineGameOptions: { roomType: onlineRoomType },
    setPrivateRoomType,
  } = useGameSettings()

  const { currentIdx, onMouseEnter, onMouseLeave } = useOptionsAnimation()

  return (
    <DisplayArray
      array={GAME_PRIVATE_ROOM_ACTION}
      className="flex gap-3"
      render={(type, idx) => (
        <div className="relative">
          <GameSettingOptionsButton
            isSelected={onlineRoomType === type}
            onClick={() => setPrivateRoomType(type)}
            onMouseEnter={() => onMouseEnter(idx)}
            onMouseLeave={onMouseLeave}
          >
            <HoverMotion
              idx={idx}
              currentIdx={currentIdx}
              layoutId="hover-button-private-room-type"
            />
            {privateRoomTypeOptionsLabel[type]}
          </GameSettingOptionsButton>
        </div>
      )}
    />
  )
}
