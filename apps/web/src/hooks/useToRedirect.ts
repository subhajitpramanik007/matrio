"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useToRedirect = (
  {
    condition,
    to,
    delay = 0,
    callback,
  }: {
    condition: boolean;
    to: string;
    delay?: number;
    callback?: () => void;
  },
  deps?: any[],
) => {
  const router = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!condition) return;

    if (delay) {
      if (callback) callback();
      timeout = setTimeout(() => router.push(to), delay);
    } else {
      if (callback) callback();
      router.push(to);
    }

    return () => clearTimeout(timeout);
  }, [condition, to, delay, router, ...(deps || [])]);
};
