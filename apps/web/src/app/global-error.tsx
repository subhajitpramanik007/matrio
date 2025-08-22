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
      <body className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-8 border border-red-200 dark:border-red-800"
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
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" />
          </motion.div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Critical System Error
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The application has encountered a critical error and needs to
            restart.
          </p>

          {/* Error details */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800 mb-6 text-left">
            <code className="text-sm text-red-700 dark:text-red-300 break-all">
              {error.message || "Critical system failure"}
            </code>
            {error.digest && (
              <p className="text-xs text-red-500 dark:text-red-400 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Restart Application
          </button>
        </motion.div>
      </body>
    </html>
  );
}
