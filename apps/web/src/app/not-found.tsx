"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ArrowLeft, Gamepad2 } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        <Card className="p-8 border-2 border-primary/20 bg-card/50 backdrop-blur-sm">
          {/* Animated 404 with gaming elements */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-8xl font-bold text-primary mb-4 relative">
              4
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="inline-block mx-2"
              >
                <Gamepad2 className="w-16 h-16 text-primary" />
              </motion.div>
              4
            </div>
            <div className="text-2xl font-semibold text-muted-foreground mb-2">
              Game Over!
            </div>
            <div className="text-lg text-muted-foreground">
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
            <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
              <p className="text-sm text-muted-foreground">
                🎮 <strong>Player Status:</strong> Lost in the digital maze
              </p>
              <p className="text-sm text-muted-foreground">
                🎯 <strong>Mission:</strong> Find your way back to the game
              </p>
              <p className="text-sm text-muted-foreground">
                ⭐ <strong>Hint:</strong> Try the navigation buttons below
              </p>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="gap-2">
              <Link href="/">
                <Home className="w-4 h-4" />
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
                <Gamepad2 className="w-4 h-4" />
                Game Dashboard
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </motion.div>

          {/* Popular pages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 pt-6 border-t border-border/50"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Or try these popular destinations:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
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
