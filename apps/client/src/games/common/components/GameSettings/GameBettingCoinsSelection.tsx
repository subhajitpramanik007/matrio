import {
  GameSettingOptions,
  GameSettingOptionsButton,
  GameSettingOptionsSection,
  GameSettingOptionsTitle,
  GameSettingOptionsWrapper,
} from './GameSettingOption'
import type { GameBettingCoinsSelectionProps } from '@/games/common/types'
import { ONLINE_GAME_BETTING_COST } from '@/games/common/constants/game.constant'

import { HoverMotion } from '@/components/hover-motion'
import { DisplayThis } from '@/components/display-this'
import { useOptionsAnimation } from '@/hooks/use-options-animation'

export const GameBettingCoinsSelection = ({
  onlineRoomType,
  privateRoomType,
  bettingCoins,
  onChangeBettingCoins,
}: GameBettingCoinsSelectionProps) => {
  const { currentIdx, onMouseEnter, onMouseLeave } = useOptionsAnimation()

  const isCanDisplay = onlineRoomType === 'random' || privateRoomType === 'create'

  return (
    <DisplayThis when={isCanDisplay}>
      <GameSettingOptionsWrapper>
        <GameSettingOptionsSection>
          <GameSettingOptionsTitle>Select Coins</GameSettingOptionsTitle>
          <GameSettingOptions>
            {ONLINE_GAME_BETTING_COST.map((coin, idx) => (
              <div className="relative" key={coin}>
                <GameSettingOptionsButton
                  isSelected={bettingCoins === coin}
                  onClick={() => onChangeBettingCoins(coin)}
                  onMouseEnter={() => onMouseEnter(idx)}
                  onMouseLeave={onMouseLeave}
                >
                  <HoverMotion currentIdx={currentIdx} idx={idx} layoutId="hover-button-coin" />
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
