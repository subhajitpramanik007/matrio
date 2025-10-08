import { GameProvider } from "@/app/games/_lib/games.provider";
import { Container } from "@/components/Container";
import { gameParamSchema } from "../_lib/schema";
import { zodValidate } from "@/lib/zod-validate";

export default async function GameLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ game: string }>;
}) {
  const validateData = zodValidate.schema(gameParamSchema).data(await params);

  return (
    <GameProvider game={validateData.game}>
      <Container className="w-full max-w-7xl py-2">{children}</Container>
    </GameProvider>
  );
}
