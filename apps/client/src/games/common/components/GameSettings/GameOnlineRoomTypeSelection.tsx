import {
  GameSettingOptions,
  GameSettingOptionsButton,
  GameSettingOptionsSection,
  GameSettingOptionsTitle,
  GameSettingOptionsWrapper,
} from './GameSettingOption'
import { onlineRoomTypeOptionsLabel } from './gameSettingsData'
import type { GameOnlineRoomSelectionProps } from '@/games/common/types'
import { GAME_ONLINE_ROOM_TYPE } from '@/games/common/constants/game.constant'

import { HoverMotion } from '@/components/hover-motion'
import { DisplayThis } from '@/components/display-this'
import { DisplayArray } from '@/components/display-array'
import { useOptionsAnimation } from '@/hooks/use-options-animation'

export function GameOnlineRoomSelection({
  gameMode,
  onlineRoomType,
  onChangeOnlineRoomType,
}: GameOnlineRoomSelectionProps) {
  const isCanDisplay = gameMode === 'online'

  return (
    <DisplayThis when={isCanDisplay}>
      <GameSettingOptionsWrapper>
        <GameSettingOptionsSection>
          <GameSettingOptionsTitle>Select Online Room Type</GameSettingOptionsTitle>
          <GameSettingOptions>
            <GamePrivateRoomSelectionContent
              onlineRoomType={onlineRoomType}
              gameMode={gameMode}
              onChangeOnlineRoomType={onChangeOnlineRoomType}
            />
          </GameSettingOptions>
        </GameSettingOptionsSection>
      </GameSettingOptionsWrapper>
    </DisplayThis>
  )
}

function GamePrivateRoomSelectionContent({
  onlineRoomType,
  onChangeOnlineRoomType,
}: GameOnlineRoomSelectionProps) {
  const { currentIdx, onMouseEnter, onMouseLeave } = useOptionsAnimation()

  return (
    <DisplayArray
      array={[...GAME_ONLINE_ROOM_TYPE]}
      className="flex gap-3"
      render={(mode, idx) => (
        <div className="relative">
          <GameSettingOptionsButton
            key={mode}
            isSelected={onlineRoomType === mode}
            onClick={() => onChangeOnlineRoomType(mode)}
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
