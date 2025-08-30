"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import * as React from "react";

interface ProfileSubHeaderProps {
  profile: any;
}

export const ProfileSubHeader: React.FC<ProfileSubHeaderProps> = ({
  profile,
}) => {
  return (
    <nav className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 w-full max-w-7xl border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span className="text-xl font-bold">Profile</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="px-4 py-2 text-lg">
            Level {profile.level}
          </Badge>
        </div>
      </div>
    </nav>
  );
};
