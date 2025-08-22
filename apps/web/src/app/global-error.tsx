"use client";

import { motion } from "motion/react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4 dark:from-red-950 dark:to-red-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-lg rounded-lg border border-red-200 bg-white p-8 text-center shadow-2xl dark:border-red-800 dark:bg-gray-900"
        >
          {/* Critical error icon */}
          <motion.div
            animate={{
              rotate: [0, -5, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 2,
            }}
            className="mb-6"
          >
            <AlertTriangle className="mx-auto h-16 w-16 text-red-500" />
          </motion.div>

          <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Critical System Error
          </h1>

          <p className="mb-6 text-gray-600 dark:text-gray-300">
            The application has encountered a critical error and needs to
            restart.
          </p>

          {/* Error details */}
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-left dark:border-red-800 dark:bg-red-900/20">
            <code className="text-sm break-all text-red-700 dark:text-red-300">
              {error.message || "Critical system failure"}
            </code>
            {error.digest && (
              <p className="mt-2 text-xs text-red-500 dark:text-red-400">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition-colors hover:bg-red-700"
          >
            <RefreshCw className="h-4 w-4" />
            Restart Application
          </button>
        </motion.div>
      </body>
    </html>
  );
}
