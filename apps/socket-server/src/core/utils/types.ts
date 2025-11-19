import { GameNamespaces } from './constants'

export type GameNamespace = (typeof GameNamespaces)[number]

export type RoomCode = string
export type RoomId = `${GameNamespace}:${RoomCode}`
