import { DisableWindowContext } from "@/components/DisableWindowContext";
import { Header } from "@/components/navigation/header";

export default function GamesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <DisableWindowContext />
      {children}
    </>
  );
}
