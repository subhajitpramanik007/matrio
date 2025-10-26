import { useEffect } from 'react'
import { Link, useRouter } from '@tanstack/react-router'
import { AlertTriangle, Bug, Home, RefreshCw } from 'lucide-react'

import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function ErrorPage({
  error = new Error('Something went wrong'),
  reset = () => {},
}: {
  error?: Error
  reset?: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  function onReset() {
    // reload the page
    router.navigate({ reloadDocument: true })
    reset()
  }

  return (
    <div className="from-background via-background to-muted flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <Card className="border-destructive/20 bg-card/50 border-2 p-8 backdrop-blur-sm">
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
              <AlertTriangle className="text-destructive mx-auto h-20 w-20" />
            </motion.div>
          </motion.div>

          {/* Error message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-foreground mb-2 text-3xl font-bold">
              Oops! Something went wrong
            </h1>
            <p className="text-muted-foreground mb-4 text-lg">
              The game encountered an unexpected error
            </p>

            {/* Error details */}
            <div className="bg-muted/50 border-border/50 rounded-lg border p-4 text-left">
              <div className="mb-2 flex items-center gap-2">
                <Bug className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground text-sm font-medium">
                  Error Details:
                </span>
              </div>
              <code className="text-destructive text-sm break-all">
                {error.message || 'An unexpected error occurred'}
              </code>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Button onClick={onReset} size="lg" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 bg-transparent"
            >
              <Link to="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </motion.div>

          {/* Help text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="border-border/50 mt-8 border-t pt-6"
          >
            <p className="text-muted-foreground text-sm">
              If this problem persists, please try refreshing the page or
              contact support.
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}
