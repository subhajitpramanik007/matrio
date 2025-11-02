import type { TApiResponse, TUser } from '@/types'
import type {
  TEmailVerification,
  TResendVerificationEmail,
  TSigninForm,
  TSignupForm,
} from '@/lib/schemas'

import { apiClient } from '@/services/api'

type TAuthResponse = TApiResponse<{ accessToken: string }>

function createGuest() {
  return apiClient.post<TAuthResponse>('/auth/guest')
}

function signup(values: TSignupForm) {
  return apiClient.post<TAuthResponse, TSignupForm>('/auth/signup', values)
}

function verifyEmail(values: TEmailVerification) {
  return apiClient.post<TAuthResponse, TEmailVerification>(
    '/auth/email-verify',
    values,
  )
}

function resendVerificationEmail(values: TResendVerificationEmail) {
  return apiClient.post<TApiResponse<null>, TResendVerificationEmail>(
    '/auth/resend-verification-email',
    values,
  )
}

function signin(values: TSigninForm) {
  return apiClient.post<TAuthResponse, TSigninForm>('/auth/signin', values)
}

function signout() {
  return apiClient.post<TApiResponse<null>>('/auth/signout')
}

function refreshSession() {
  return apiClient.post<TAuthResponse>('/auth/refresh')
}

function checkSession() {
  return apiClient.post<TApiResponse<{ role: TUser['role'] }>>(
    '/auth/session/check',
  )
}

function getUser() {
  return apiClient.get<TApiResponse<{ user: TUser }>>('/users/me')
}

export const authService = {
  createGuest,
  signup,
  verifyEmail,
  resendVerificationEmail,
  signin,
  signout,
  refreshSession,
  checkSession,
  getUser,
}
