"use client";

import { EGameSlug, GameAndMode, GameMode, TGameStore } from "@/types";
import { useGameStore } from "@/app/games/_lib/games.store";
import { useParams, usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect } from "react";
import { useHeaderContext } from "@/components/navigation/header/HeaderProvider";

const GameContext = createContext<TGameStore>(useGameStore.getInitialState());

const GameSlugToName: Record<EGameSlug, string> = {
  "tic-tac-toe": "Tic Tac Toe",
  checkers: "Checkers",
};

export const GameProvider = ({
  children,
  game,
}: {
  children: React.ReactNode;
  game: EGameSlug;
}) => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const { setGameName } = useHeaderContext();

  useEffect(() => {
    let error: Error | null = null;
    if (!game) error = new Error("Game not found", { cause: "INVALID_GAME" });

    if (game) {
      // Update game name
      useGameStore.setState({ game });
      setGameName(GameSlugToName[game]);
    } else error = new Error("Invalid game slug", { cause: "INVALID_GAME" });

    if (error) {
      // Update game status
      useGameStore.setState({ status: "error" });
      throw error;
    } else useGameStore.setState({ status: "success" });
  }, [game, setGameName]);

  // clean up
  useEffect(() => {
    return () => {
      useGameStore.getState().clear();
    };
  }, []);

  const onModeChange = useCallback(
    (mode: GameMode) => {
      const game = useGameStore.getState().game;
      if (!game) return;

      const gameAndMode: GameAndMode = `${game}::${mode}`;
      useGameStore.setState({ mode, gameAndMode });

      const currentMode = params.mode;
      if (currentMode) {
        const pathnameWithoutMode = pathname.split("/").slice(0, -1).join("/");
        router.push(`${pathnameWithoutMode}/${mode}`);
      } else router.push(`${pathname}/${mode}`);
    },
    [pathname, router, params.mode],
  );

  return (
    <GameContext.Provider value={{ ...useGameStore(), setMode: onModeChange }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGames = () => useContext(GameContext);
