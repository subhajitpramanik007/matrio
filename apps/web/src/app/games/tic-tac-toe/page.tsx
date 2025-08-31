"use client";

import Link from "next/link";
import * as React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/Container";

const TIC_TAC_TOE_MODE = ["local", "ai", "multiplayer"] as const;

const TIC_TAC_TOE_MODE_LABEL = {
  local: "Local Player",
  ai: "AI Challenge",
  multiplayer: "Multiplayer Game",
};

export default function TicTacToePage() {
  return (
    <Container className="py-8" transition={{ delay: 0.5 }}>
      <div className="mx-auto h-full w-full max-w-4xl space-y-4">
        <div className="w-full text-center">
          <h2 className="text-3xl font-bold">
            Choose a mode to play Tic-Tac-Toe
          </h2>
        </div>
        <motion.div
          className="mt-16 flex w-full flex-col items-center justify-center gap-6 md:flex-row"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.2 }}
        >
          {TIC_TAC_TOE_MODE.map((mode) => (
            <motion.div key={mode}>
              <Link
                href={`/games/tic-tac-toe/${mode}`}
                className={cn(
                  "min-w-[8rem] rounded-lg p-4 text-center text-white transition-colors hover:bg-sky-500",
                  mode === "local" && "bg-sky-500/90 hover:bg-sky-500",
                  mode === "ai" && "bg-rose-500/90 hover:bg-rose-500",
                  mode === "multiplayer" &&
                    "bg-indigo-500/90 hover:bg-indigo-500",
                )}
              >
                <span className="text-xl font-bold capitalize">
                  {TIC_TAC_TOE_MODE_LABEL[mode]}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Container>
  );
}
