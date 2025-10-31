import type { TSocketResponseData } from '@/types'
import type { TOnlineGameResult, TOnlineTicTacToeRoom } from '../../types'
import { useSocketListener } from '@/hooks/socket'

type GameResultData = TSocketResponseData<{
  result: TOnlineGameResult
  room: TOnlineTicTacToeRoom
}>

export const useGameResultListener = (
  callback: (data: GameResultData) => void,
) =>
  useSocketListener({
    event: 'game_result',
    onSuccess: (data: GameResultData) => callback(data),
    onError: (error) => console.error('game_result error', error),
  })
