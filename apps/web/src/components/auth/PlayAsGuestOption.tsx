"use client";

import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";

export const PlayAsGuestOption: React.FC = () => {
  return (
    <div className="text-center">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="border-border w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">Or</span>
        </div>
      </div>
      <Link href="/">
        <Button variant="outline" className="mt-4 w-full bg-transparent">
          Continue as Guest
        </Button>
      </Link>
    </div>
  );
};
