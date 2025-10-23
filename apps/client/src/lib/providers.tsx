import { HeaderContext } from './contexts/header-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return <HeaderContext.Provider>{children}</HeaderContext.Provider>
}
