import { zodValidate } from "@/lib/zod-validate";
import { gameModeParamSchema } from "../../_lib/schema";
import { useGameStore } from "../../_lib/games.store";

export default async function GameLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ game: string; mode: string }>;
}) {
  const validateData = zodValidate
    .schema(gameModeParamSchema)
    .data(await params);

  const game = validateData.game;
  const gameMode = validateData.mode;
  useGameStore.setState({
    mode: gameMode,
    gameAndMode: `${game}::${gameMode}`,
  });

  return children;
}
