import { ThemeProvider } from '@/components/theme-provider'

import { AuthProvider } from '@/lib/contexts/auth-context'
import { SessionProvider } from '@/lib/contexts/session-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SessionProvider>{children}</SessionProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
