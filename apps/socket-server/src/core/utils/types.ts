export type GameNamespace = 'tic_tac_toe' | 'checkers'

export type RoomCode = string
export type RoomId = `${GameNamespace}:${RoomCode}`
