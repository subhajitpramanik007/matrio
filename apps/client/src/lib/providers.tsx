import { ThemeProvider } from '@/components/theme-provider'

import { AuthContext } from '@/lib/contexts/auth-context'
import { HeaderContext } from '@/lib/contexts/header-context'
import { SessionContext } from '@/lib/contexts/session-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <HeaderContext.Provider>
        <AuthContext.Provider>
          <SessionContext.Provider>{children}</SessionContext.Provider>
        </AuthContext.Provider>
      </HeaderContext.Provider>
    </ThemeProvider>
  )
}
