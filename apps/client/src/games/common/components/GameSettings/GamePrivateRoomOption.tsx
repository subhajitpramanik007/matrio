import {
  GameSettingOptions,
  GameSettingOptionsButton,
  GameSettingOptionsSection,
  GameSettingOptionsTitle,
  GameSettingOptionsWrapper,
} from './GameSettingOption'
import { privateRoomTypeOptionsLabel } from './gameSettingsData'
import type { GamePrivateRoomSelectionProps } from '@/games/common/types'
import { GAME_PRIVATE_ROOM_ACTION } from '@/games/common/constants/game.constant'

import { DisplayThis } from '@/components/display-this'
import { DisplayArray } from '@/components/display-array'
import { HoverMotion } from '@/components/hover-motion'
import { useOptionsAnimation } from '@/hooks/use-options-animation'

export function GamePrivateRoomSelection({
  gameMode,
  onlineRoomType,
  privateRoomType,
  onChangePrivateRoomType,
}: GamePrivateRoomSelectionProps) {
  const isCanDisplay = gameMode === 'online' && onlineRoomType === 'private'
  const { currentIdx, onMouseEnter, onMouseLeave } = useOptionsAnimation()

  return (
    <DisplayThis when={isCanDisplay}>
      <GameSettingOptionsWrapper>
        <GameSettingOptionsSection>
          <GameSettingOptionsTitle>
            Do you want to create or join a private room?
          </GameSettingOptionsTitle>
          <GameSettingOptions>
            <DisplayArray
              array={GAME_PRIVATE_ROOM_ACTION}
              className="flex gap-3"
              render={(type, idx) => (
                <div className="relative">
                  <GameSettingOptionsButton
                    isSelected={privateRoomType === type}
                    onClick={() => onChangePrivateRoomType(type)}
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
          </GameSettingOptions>
        </GameSettingOptionsSection>
      </GameSettingOptionsWrapper>
    </DisplayThis>
  )
}
