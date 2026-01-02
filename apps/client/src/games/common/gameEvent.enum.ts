export enum GameEvent {
  CREATE_ROOM = 'create_room',
  JOIN_ROOM = 'join_room',
  RANDOM_ROOM = 'random_room',
  LEAVE_ROOM = 'leave_room',
  START_GAME = 'start_game',
  READY = 'ready',
  MAKE_MOVE = 'make_move',
  END_GAME = 'end_game',
  RESTART_GAME = 'restart_game',
  RESULT = 'result',
}

export enum GameEventResponse {
  PLAYER_LEFT = 'player_left',
  PLAYER_JOINED = 'player_joined',
  PLAYER_DATA = 'player_data',
  PLAYER_READY = 'player_ready',
  GAME_STARTED = 'game_started',
  GAME_RESULT = 'game_result',
  ROOM_DELETED = 'room_deleted',
  PLAYER_MOVED = 'player_moved',
}
