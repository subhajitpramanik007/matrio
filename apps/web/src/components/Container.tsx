"use client";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "motion/react";

export function Container({
  className,
  children,
  ...props
}: HTMLMotionProps<"div"> & {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={cn("container mx-auto w-full", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
