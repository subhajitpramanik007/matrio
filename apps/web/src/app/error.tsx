"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("[v0] Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        <Card className="p-8 border-2 border-destructive/20 bg-card/50 backdrop-blur-sm">
          {/* Error icon with animation */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
              className="inline-block"
            >
              <AlertTriangle className="w-20 h-20 text-destructive mx-auto" />
            </motion.div>
          </motion.div>

          {/* Error message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              The game encountered an unexpected error
            </p>

            {/* Error details */}
            <div className="bg-muted/50 rounded-lg p-4 border border-border/50 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Bug className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Error Details:
                </span>
              </div>
              <code className="text-sm text-destructive break-all">
                {error.message || "An unexpected error occurred"}
              </code>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button onClick={reset} size="lg" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 bg-transparent"
            >
              <Link href="/">
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
          </motion.div>

          {/* Help text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 pt-6 border-t border-border/50"
          >
            <p className="text-sm text-muted-foreground">
              If this problem persists, please try refreshing the page or
              contact support.
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
