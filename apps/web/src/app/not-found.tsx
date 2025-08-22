"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ArrowLeft, Gamepad2 } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="from-background via-background to-muted flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <Card className="border-primary/20 bg-card/50 border-2 p-8 backdrop-blur-sm">
          {/* Animated 404 with gaming elements */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-primary relative mb-4 text-8xl font-bold">
              4
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="mx-2 inline-block"
              >
                <Gamepad2 className="text-primary h-16 w-16" />
              </motion.div>
              4
            </div>
            <div className="text-muted-foreground mb-2 text-2xl font-semibold">
              Game Over!
            </div>
            <div className="text-muted-foreground text-lg">
              The page you're looking for doesn't exist
            </div>
          </motion.div>

          {/* Gaming-themed message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 space-y-4"
          >
            <div className="bg-muted/50 border-border/50 rounded-lg border p-4">
              <p className="text-muted-foreground text-sm">
                🎮 <strong>Player Status:</strong> Lost in the digital maze
              </p>
              <p className="text-muted-foreground text-sm">
                🎯 <strong>Mission:</strong> Find your way back to the game
              </p>
              <p className="text-muted-foreground text-sm">
                ⭐ <strong>Hint:</strong> Try the navigation buttons below
              </p>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Button asChild size="lg" className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 bg-transparent"
            >
              <Link href="/dashboard">
                <Gamepad2 className="h-4 w-4" />
                Game Dashboard
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </motion.div>

          {/* Popular pages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="border-border/50 mt-8 border-t pt-6"
          >
            <p className="text-muted-foreground mb-4 text-sm">
              Or try these popular destinations:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button asChild variant="link" size="sm">
                <Link href="/games/tic-tac-toe">Tic-Tac-Toe</Link>
              </Button>
              <Button asChild variant="link" size="sm">
                <Link href="/games/checkers">Checkers</Link>
              </Button>
              <Button asChild variant="link" size="sm">
                <Link href="/leaderboard">Leaderboard</Link>
              </Button>
              <Button asChild variant="link" size="sm">
                <Link href="/profile">Profile</Link>
              </Button>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
