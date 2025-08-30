"use client";

import * as React from "react";

export const TicTacToePreviewDisplay: React.FC = () => {
  return (
    <div className="mx-auto mb-4 grid max-w-24 grid-cols-3 gap-1">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="border-border bg-card hover:bg-accent/10 flex aspect-square items-center justify-center rounded border text-sm font-bold transition-colors"
        >
          {i === 0 ? "X" : i === 4 ? "O" : i === 8 ? "X" : ""}
        </div>
      ))}
    </div>
  );
};
