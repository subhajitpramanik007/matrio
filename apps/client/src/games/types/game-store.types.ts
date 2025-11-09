export type TOnlineGameStoreState<
  TOnlineRoom = any,
  TOnlinePlayer = any,
  TOnlineGameResult = any,
> = {
  gameStarted: boolean
  room: TOnlineRoom | null
  player: TOnlinePlayer | null
  gameResult: TOnlineGameResult | null
}
