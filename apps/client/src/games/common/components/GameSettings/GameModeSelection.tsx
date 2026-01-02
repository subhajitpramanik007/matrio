import {
  GameSettingOptions,
  GameSettingOptionsButton,
  GameSettingOptionsSection,
  GameSettingOptionsTitle,
  GameSettingOptionsWrapper,
} from './GameSettingOption'
import { GAME_MODES_DATA } from './gameSettingsData'
import type { GameModeSelectionProps } from '@/games/common/types'

import { HoverMotion } from '@/components/hover-motion'
import { DisplayArray } from '@/components/display-array'
import { useOptionsAnimation } from '@/hooks/use-options-animation'

export function GameModeSelection({ gameMode, onChangeGameMode }: GameModeSelectionProps) {
  return (
    <GameSettingOptionsWrapper>
      <GameSettingOptionsSection>
        <GameSettingOptionsTitle>Select Game Mode</GameSettingOptionsTitle>
        <GameSettingOptions>
          <DisplayGameModes
            key="game-modes"
            gameMode={gameMode}
            onChangeGameMode={onChangeGameMode}
          />
        </GameSettingOptions>
      </GameSettingOptionsSection>
    </GameSettingOptionsWrapper>
  )
}

function DisplayGameModes({ gameMode, onChangeGameMode }: GameModeSelectionProps) {
  const { currentIdx, onMouseEnter, onMouseLeave } = useOptionsAnimation()

  return (
    <DisplayArray
      array={GAME_MODES_DATA}
      className="flex gap-3"
      render={({ Icon, label, mode }, idx) => (
        <div className="relative" key={mode}>
          <GameSettingOptionsButton
            isSelected={gameMode === mode}
            onClick={() => onChangeGameMode(mode)}
            onMouseEnter={() => onMouseEnter(idx)}
            onMouseLeave={onMouseLeave}
          >
            <HoverMotion currentIdx={currentIdx} idx={idx} layoutId="hover-button-game-mode" />
            <Icon className="size-4" />
            {label}
          </GameSettingOptionsButton>
        </div>
      )}
    />
  )
}
