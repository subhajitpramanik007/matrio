import type { TAuthContextState, TAuthReducerAction } from '@/types'
import { USER_TYPE } from '@/types'

export const INITIAL_STATE_AUTH_REDUCER: TAuthContextState = {
  user: null,
  token: null,
  userType: USER_TYPE.USER,
  isAuthenticated: false,
  isGuest: false,
  status: 'loading',
}

export function authReducer(
  state: TAuthContextState,
  action: TAuthReducerAction,
) {
  switch (action.type) {
    case 'INIT_AS_GUEST':
      return { ...state, ...action.payload }
    case 'INIT_AS_USER':
      return { ...state, ...action.payload }
    case 'LOGOUT':
      return { ...INITIAL_STATE_AUTH_REDUCER }
    case 'FAILED':
      return {
        ...state,
        ...INITIAL_STATE_AUTH_REDUCER,
        status: 'unauthenticated',
      }
    default:
      return state
  }
}
