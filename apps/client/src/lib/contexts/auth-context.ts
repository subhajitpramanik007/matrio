import { useCallback, useReducer } from 'react'
import { createReactContext } from '../create-react-context'

import type { TAuthContext, TAuthContextUserPayload } from '@/types'
import { USER_TYPE } from '@/types'

import {
  INITIAL_STATE_AUTH_REDUCER,
  authReducer,
} from '@/lib/reducers/auth.reducer'

export const AuthContext = createReactContext<TAuthContext>(
  () => {
    const [state, dispatch] = useReducer(
      authReducer,
      INITIAL_STATE_AUTH_REDUCER,
    )

    const onInitAsGuest = useCallback((payload: TAuthContextUserPayload) => {
      dispatch({
        type: 'INIT_AS_GUEST',
        payload: {
          user: payload.user,
          isAuthenticated: true,
          isGuest: true,
          status: 'authenticated',
          userType: USER_TYPE.GUEST,
        },
      })
    }, [])

    const onInitAsUser = useCallback((payload: TAuthContextUserPayload) => {
      dispatch({
        type: 'INIT_AS_USER',
        payload: {
          user: payload.user,
          isAuthenticated: true,
          isGuest: false,
          status: 'authenticated',
          userType: USER_TYPE.USER,
        },
      })
    }, [])

    function onLogout() {
      dispatch({ type: 'LOGOUT' })
    }

    return {
      ...state,
      onInitAsGuest,
      onInitAsUser,
      onLogout,
      onFailedToInit: () => dispatch({ type: 'FAILED' }),
    }
  },
  { name: 'Auth' },
)

export const AuthProvider = AuthContext.Provider
