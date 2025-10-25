import type { TUser } from './user.types'

export type TAuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export enum USER_TYPE {
  USER = 'USER',
  GUEST = 'GUEST',
}

export type TAuthContextState = {
  user: TUser | null
  token: string | null
  userType: USER_TYPE
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
