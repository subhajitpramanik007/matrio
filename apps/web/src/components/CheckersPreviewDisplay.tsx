"use client";

import * as React from "react";

export const CheckersPreviewDisplay: React.FC = () => {
  return (
    <div className="mx-auto mb-4 grid max-w-24 grid-cols-4 gap-0.5">
      {Array.from({ length: 16 }).map((_, i) => {
        const isEven = Math.floor(i / 4) % 2 === 0;
        const isDark = isEven ? i % 2 === 1 : i % 2 === 0;
        const hasPiece = i < 6 || i > 9;
        const pieceColor = i < 6 ? "bg-red-500" : "bg-gray-800";

        return (
          <div
            key={i}
            className={`aspect-square ${
              isDark ? "bg-gray-700" : "bg-gray-200"
            } flex items-center justify-center`}
          >
            {hasPiece && isDark && (
              <div
                className={`h-2 w-2 rounded-full ${pieceColor} border border-white`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
