import {
  GameBettingCoinsSelection,
  GameModeSelection,
  GameOnlineRoomSelection,
  GamePrivateRoomSelection,
  GameSettingContinueButton,
} from '@/games/common/components/GameSettings'
import {
  useGameSettings,
  useGameSettingsActions,
  useResetGameSettings,
} from '@/games/common/hooks/useGameSettings'

export function SingleGameSettingsPage() {
  const {
    selectedGameMode,
    selectedOnlineRoomType,
    selectedPrivateRoomType,
    selectedBettingCoins,
  } = useGameSettings()
  const dispatch = useGameSettingsActions()

  useResetGameSettings()

  return (
    <div className="flex flex-col gap-8 pt-8">
      <GameModeSelection
        gameMode={selectedGameMode} //
        onChangeGameMode={(gm) => dispatch({ type: 'SET_GAME_MODE', payload: gm })}
      />
      <GameOnlineRoomSelection
        gameMode={selectedGameMode}
        onlineRoomType={selectedOnlineRoomType}
        onChangeOnlineRoomType={(type) => dispatch({ type: 'SET_ONLINE_ROOM_TYPE', payload: type })}
      />
      <GamePrivateRoomSelection
        gameMode={selectedGameMode}
        onlineRoomType={selectedOnlineRoomType}
        privateRoomType={selectedPrivateRoomType}
        onChangePrivateRoomType={(v) => dispatch({ type: 'SET_PRIVATE_ROOM_TYPE', payload: v })}
      />
      <GameBettingCoinsSelection
        onlineRoomType={selectedOnlineRoomType}
        privateRoomType={selectedPrivateRoomType}
        bettingCoins={selectedBettingCoins}
        onChangeBettingCoins={(v) => dispatch({ type: 'SET_BETTING_COINS', payload: v })}
      />
      <div className="flex w-full justify-center">
        <GameSettingContinueButton
          gameMode={selectedGameMode}
          onlineRoomType={selectedOnlineRoomType}
          privateRoomType={selectedPrivateRoomType}
          bettingCoins={selectedBettingCoins}
        />
      </div>
    </div>
  )
}
