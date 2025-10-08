"use client";

import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { AuthorizedLayout, UnauthorizedLayout } from "@/components/auth";
import { UserButton } from "./UserButton";
import { AppLogo } from "@/components/AppLogo";
import { ThemeToggle } from "./ThemeToggle";
import { useSession } from "@/hooks/auth";
import { ShowCoins } from "./ShowCoins";
import { Container } from "@/components/Container";
import { useHeaderContext } from "@/components/navigation/header/HeaderProvider";

export const Header: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const { gameName } = useHeaderContext();
  const { user } = useSession();

  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/40 sticky top-0 z-50 border-b px-8 backdrop-blur">
      <div className="container mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
        <div className="flex h-full items-center justify-center">
          <AppLogo className="mb-0" />
        </div>
        <div className="mx-auto w-full">
          <Container className="flex items-center justify-center">
            <h2 className="text-xl font-bold">{gameName}</h2>
          </Container>
          {children}
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <UnauthorizedLayout>
            <div className="flex space-x-4">
              <Link href="/auth/signup">
                <Button>Create Free Account</Button>
              </Link>
            </div>
          </UnauthorizedLayout>
          <AuthorizedLayout className="flex gap-4">
            <ShowCoins coins={user?.coins || 0} />
            <UserButton user={user} />
          </AuthorizedLayout>
        </div>
      </div>
    </header>
  );
};
