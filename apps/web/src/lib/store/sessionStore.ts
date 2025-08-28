import { create } from "zustand";
import { SessionStore } from "@/types/session.type";

const initialState: Omit<SessionStore, "setUser" | "signout" | "clear"> = {
  status: "loading",
  isTokenAuthenticated: false,
  isAuthenticated: false,
  isGuest: true,
  user: null,
  accessToken: null,
  accessTokenUpdatedAt: 0,
};

export const useSessionStore = create<SessionStore>((set, get) => ({
  ...initialState,

  setUser: (user) => set({ user }),

  signout: () => get().clear(),
  clear: () => set({ ...initialState }),
}));
