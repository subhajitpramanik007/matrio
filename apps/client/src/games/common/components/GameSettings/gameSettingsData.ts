import { BotIcon, Users2Icon } from 'lucide-react'
import type { GameOnlineRoomType, GamePrivateRoomAction } from '@/games/common/types'

export const GAME_MODES_DATA = [
  {
    mode: 'ai',
    label: 'Player vs AI',
    Icon: BotIcon,
    color: 'bg-orange-700 hover:bg-orange-600 text-orange-100 hover:text-orange-50',
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

export const onlineRoomTypeOptionsLabel: Record<GameOnlineRoomType, string> = {
  private: 'Play with Friends',
  public: 'Play with Random Players',
}

export const privateRoomTypeOptionsLabel: Record<GamePrivateRoomAction, string> = {
  create: 'Create Private Room',
  join: 'Join Private Room',
}
