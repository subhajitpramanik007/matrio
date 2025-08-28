import { IUser } from "./user.type";

export const AUTH_STATUS = [
  "loading",
  "authenticated",
  "unauthenticated",
] as const;

export type Status = (typeof AUTH_STATUS)[number];

export interface AuthState {
  status: Status;
  isTokenAuthenticated: boolean;
  accessToken: string | null;
  accessTokenUpdatedAt: number;
}

export interface SessionState {
  isAuthenticated: boolean;
  isGuest: boolean;
  isPending: boolean;
  user: IUser | null;
}

export interface SessionStore extends SessionState, AuthState {
  setUser: (user: IUser) => void;
  signout: () => void;
  clear: () => void;
}
