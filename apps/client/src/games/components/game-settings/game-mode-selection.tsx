import { BotIcon, Users2Icon } from 'lucide-react'

import {
  GameSettingOptions,
  GameSettingOptionsButton,
  GameSettingOptionsSection,
  GameSettingOptionsTitle,
  GameSettingOptionsWrapper,
} from '@/games/components/game-settings'

import { useGameSettings } from '@/games/hooks'
import { useOptionsAnimation } from '@/hooks/use-options-animation'
import { HoverMotion } from '@/components/hover-motion'

const Modes = [
  {
    mode: 'ai',
    label: 'Player vs AI',
    Icon: BotIcon,
    color:
      'bg-orange-700 hover:bg-orange-600 text-orange-100 hover:text-orange-50',
  },
  {
    mode: 'online',
    label: 'Online Multi-Player',
    Icon: Users2Icon,
    color: 'bg-blue-700 hover:bg-blue-600 text-blue-100 hover:text-blue-50',
  },
  {
    mode: 'local',
    label: 'Local Multi-Player',
    Icon: Users2Icon,
    color: 'bg-green-700 hover:bg-green-600 text-green-100 hover:text-green-50',
  },
] as const

export function GameModeSelection() {
  const { setGameMode, selectedMode } = useGameSettings()
  const { currentIdx, onMouseEnter, onMouseLeave } = useOptionsAnimation()

  return (
    <GameSettingOptionsWrapper>
      <GameSettingOptionsSection>
        <GameSettingOptionsTitle>Select Game Mode</GameSettingOptionsTitle>
        <GameSettingOptions>
          {Modes.map(({ mode, label, Icon }, idx) => (
            <div className="relative" key={mode}>
              <GameSettingOptionsButton
                isSelected={selectedMode === mode}
                onClick={() => setGameMode(mode)}
                onMouseEnter={() => onMouseEnter(idx)}
                onMouseLeave={onMouseLeave}
              >
                <HoverMotion
                  currentIdx={currentIdx}
                  idx={idx}
                  layoutId="hover-button-game-mode"
                />
                <Icon className="size-4" />
                {label}
              </GameSettingOptionsButton>
            </div>
          ))}
        </GameSettingOptions>
      </GameSettingOptionsSection>
    </GameSettingOptionsWrapper>
  )
}
