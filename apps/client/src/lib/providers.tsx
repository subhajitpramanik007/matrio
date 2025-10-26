import { ThemeProvider } from '@/components/theme-provider'

import { AuthContext } from '@/lib/contexts/auth-context'
import { SessionContext } from '@/lib/contexts/session-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthContext.Provider>
        <SessionContext.Provider>{children}</SessionContext.Provider>
      </AuthContext.Provider>
    </ThemeProvider>
  )
}
