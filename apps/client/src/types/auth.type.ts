import type { TUser } from './user.types'

const AuthStatus = ['loading', 'authenticated', 'unauthenticated', 'error']
export type TAuthStatus = (typeof AuthStatus)[number]

export enum USER_TYPE {
  USER = 'USER',
  GUEST = 'GUEST',
}

export type TAuthContextState = {
  user: TUser | null
  token: string | null
  userType: USER_TYPE | null
  isAuthenticated: boolean
  isGuest: boolean
  status: TAuthStatus
}

export type TAuthContextUserPayload = Pick<TAuthContextState, 'user'>
export type TAuthContextStatePayload = Omit<TAuthContextState, 'user' | 'token'>

export type TAuthContextActions = {
  onInitAsGuest: (payload: TAuthContextUserPayload) => void
  onInitAsUser: (payload: TAuthContextUserPayload) => void
  onLogout: () => void
  onFailedToInit: () => void
}

export type TAuthContext = TAuthContextState & TAuthContextActions

export type TAuthReducerAction =
  | {
      type: 'INIT_AS_GUEST'
      payload: Partial<TAuthContextStatePayload> & TAuthContextUserPayload
    }
  | {
      type: 'INIT_AS_USER'
      payload: Partial<TAuthContextStatePayload> & TAuthContextUserPayload
    }
  | { type: 'LOGOUT' }
  | { type: 'FAILED' }
