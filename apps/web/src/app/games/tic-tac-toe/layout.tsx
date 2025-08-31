import { Header } from "@/components/navigation/header";
import { TTTHeader } from "@/games/tic-tac-toe/components/TTTHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "Play Tic Tac Toe with your friends",
};

export default function TicTacToeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full">
      <TTTHeader />
      <main className="flex w-full items-center justify-center px-4">
        <div className="w-full max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
