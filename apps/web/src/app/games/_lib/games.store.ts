import { create } from "zustand";
import { TGameStore } from "@/types/game.type";

export const useGameStore = create<TGameStore>((set) => ({
  gameAndMode: null,
  game: null,
  mode: null,
  status: "idle",
  setGame: (game) => set({ game }),
  setMode: (mode) => set({ mode }),
  clear: () => set({ game: null, mode: null, status: "idle" }),
}));
