export type TUser = {
  id: string
  username: string
  email: string
  role: string
  avatar: TAvatar
  createdAt: Date
  name: null
  level: number
  coins: number
}

export type TAvatar = {
  url: string
  id: number
  name: string
}
