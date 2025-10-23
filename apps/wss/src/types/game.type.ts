export enum GameEventsRequest {
  CREATE_ROOM = "create_room", // create room
  JOIN_ROOM = "join_room", // join room
  RANDOM_ROOM = "random_room", // random room
  LEAVE_ROOM = "leave_room", // leave room
  START_GAME = "start_game", // start game
  READY = "player_ready", // player ready
  MAKE_MOVE = "make_move", // make move
  END_GAME = "end_game", // end game
  RESTART_GAME = "restart_game", // restart game
  RESULT = "result", // result
}

export enum GameEventsResponse {
  PLAYER_LEFTED = "player_lefted", // player left
  PLAYER_JOINED = "player_joined", // player joined
  PLAYER_DATA = "player_data", // player data
  PLAYER_READY = "player_ready", // player ready
  GAME_STARTED = "game_started", // game started
  GAME_RESULT = "game_result", // game result
  ROOM_DELETED = "room_deleted", // room deleted
  PLAYER_MOVED = "player_moved", // player moved
}

export enum GameType {
  TIC_TAC_TOE = "tic_tac_toe",
  CHECKERS = "checkers",
}
