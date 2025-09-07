"use client";

import { Button } from "@/components/ui/button";
import { IUser } from "@/types";
import { CoinsIcon, PlusIcon } from "lucide-react";
import * as React from "react";

interface ShowCoinsProps {
  coins: IUser["coins"];
}

export const ShowCoins: React.FC<ShowCoinsProps> = ({ coins }) => {
  return (
    <div className="bg-muted flex items-center justify-center gap-2 rounded-full px-4 py-1 font-semibold text-yellow-500">
      <CoinsIcon className="size-5" />
      <span>{coins}</span>

      {/* TODO: Add coin modal */}
      <Button variant="ghost" size="sm">
        <PlusIcon className="size-5" />
      </Button>
    </div>
  );
};
