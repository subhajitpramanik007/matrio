import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import * as React from "react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
