import { DisableWindowContext } from "@/components/DisableWindowContext";

export default function GamesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DisableWindowContext />
      {children}
    </>
  );
}
