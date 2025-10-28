import {
  GameSettingOptions,
  GameSettingOptionsButton,
  GameSettingOptionsSection,
  GameSettingOptionsTitle,
  GameSettingOptionsWrapper,
} from '@/games/components/game-settings'
import { DisplayThis } from '@/components/display-this'
import { GAME_COST } from '@/games/game.constant'
import { useGameSettings } from '@/games/hooks'
import { useOptionsAnimation } from '@/hooks/use-options-animation'
import { HoverMotion } from '@/components/hover-motion'

export const GameCostSelection = () => {
  const { onlineGameOptions, setGameCost } = useGameSettings()
  const {
    cost,
    mode: onlineGameMode,
    roomType: onlineRoomType,
  } = onlineGameOptions
  const { currentIdx, onMouseEnter, onMouseLeave } = useOptionsAnimation()

  const isCanDisplay =
    onlineGameMode === 'public' || onlineRoomType === 'create'

  return (
    <DisplayThis when={isCanDisplay}>
      <GameSettingOptionsWrapper>
        <GameSettingOptionsSection>
          <GameSettingOptionsTitle>Select Coins</GameSettingOptionsTitle>
          <GameSettingOptions>
            {GAME_COST.map((coin, idx) => (
              <div className="relative" key={coin}>
                <GameSettingOptionsButton
                  isSelected={cost === coin}
                  onClick={() => setGameCost(coin)}
                  onMouseEnter={() => onMouseEnter(idx)}
                  onMouseLeave={onMouseLeave}
                >
                  <HoverMotion
                    currentIdx={currentIdx}
                    idx={idx}
                    layoutId="hover-button-coin"
                  />
                  {coin}
                </GameSettingOptionsButton>
              </div>
            ))}
          </GameSettingOptions>
        </GameSettingOptionsSection>
      </GameSettingOptionsWrapper>
    </DisplayThis>
  )
}
