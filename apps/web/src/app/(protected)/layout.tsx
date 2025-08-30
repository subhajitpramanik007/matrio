import * as React from "react";
import { Header } from "@/components/navigation/header";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="container mx-auto flex min-h-screen flex-1 flex-col items-center md:px-4">
        {children}
      </main>
    </div>
  );
}
