"use client";

import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { AuthorizedLayout, UnauthorizedLayout } from "@/components/auth";
import { UserButton } from "./UserButton";
import { AppLogo } from "@/components/AppLogo";

export const Header: React.FC = () => {
  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/40 sticky top-0 z-50 border-b px-8 backdrop-blur">
      <div className="container mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
        <div className="flex h-full items-center justify-center">
          <AppLogo className="mb-0" />
        </div>
        <UnauthorizedLayout>
          <div className="flex space-x-4">
            <Link href="/auth/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </UnauthorizedLayout>
        <AuthorizedLayout>
          <UserButton />
        </AuthorizedLayout>
      </div>
    </header>
  );
};
