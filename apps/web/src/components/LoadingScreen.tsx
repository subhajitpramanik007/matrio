"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
  children?: React.ReactNode;
}

export function LoadingScreen({
  onComplete,
  duration = 3000,
  children,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => onComplete?.(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "linear", delay: 0.7 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      layoutId="loading-screen"
    >
      <div className="flex flex-col items-center space-y-8">
        {/* Animated Logo */}
        <motion.div
          className="relative"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="h-20 w-20 rounded-2xl bg-primary flex items-center justify-center relative overflow-hidden"
            animate={{
              boxShadow: [
                "0 0 20px rgba(34, 197, 94, 0.3)",
                "0 0 40px rgba(34, 197, 94, 0.6)",
                "0 0 20px rgba(34, 197, 94, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.span
              className="text-primary-foreground font-bold text-3xl"
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              M
            </motion.span>

            {/* Animated background particles */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: [-100, 100] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Game Title */}
        <motion.div
          className="text-center space-y-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold">Matrio</h1>
          <p className="text-muted-foreground">
            Loading your gaming experience...
          </p>
        </motion.div>

        {/* Animated Game Icons */}
        <motion.div
          className="flex space-x-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {/* Tic-Tac-Toe Grid */}
          <motion.div
            className="grid grid-cols-3 gap-1 w-12 h-12"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: 0,
            }}
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.div
                key={i}
                className="bg-primary/20 rounded-sm"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>

          {/* Checkers Board */}
          <motion.div
            className="grid grid-cols-4 gap-0.5 w-12 h-12"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: 1,
            }}
          >
            {Array.from({ length: 16 }).map((_, i) => {
              const isEven = Math.floor(i / 4) % 2 === 0;
              const isDark = isEven ? i % 2 === 1 : i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  className={`aspect-square ${isDark ? "bg-primary/40" : "bg-primary/10"} rounded-sm`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.05,
                  }}
                />
              );
            })}
          </motion.div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-64 h-2 bg-muted rounded-full overflow-hidden"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 256, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: [-20, 256] }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Progress Text */}
        <motion.p
          className="text-sm text-muted-foreground font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {progress}%
        </motion.p>

        {/* Loading Dots */}
        <motion.div
          className="flex space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
