import { Container } from "@/components/Container";
import { useRouter } from "next/navigation";
import { TTTMenuButton } from "./tictactoe.menu";
import { ChildrenProps } from "@/types";
import { useParams } from "next/navigation";

interface TicTacToeContainerProps extends ChildrenProps {
  resetGame: () => void;
}

export const TicTacToeContainer = ({
  children,
  resetGame,
}: TicTacToeContainerProps) => {
  const router = useRouter();
  const { game } = useParams();

  return (
    <Container className="relative w-full py-8">
      <TTTMenuButton
        onNewGame={resetGame}
        onExit={() => router.push(`/games/${game}`)}
      />
      {children}
    </Container>
  );
};
