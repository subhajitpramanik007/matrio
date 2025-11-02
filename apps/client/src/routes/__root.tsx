import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Toaster } from 'react-hot-toast'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import type { TAuthContext } from '@/types'
import type { QueryClient } from '@tanstack/react-query'
import { HeaderProvider } from '@/lib/contexts/header-context'

import { Header } from '@/components/header/Header'
import { SessionLayout } from '@/components/session-layout'
import { Toaster as ShadcnToaster } from '@/components/ui/sonner'
import { SocketProvider } from '@/lib/contexts/socket-context'

interface MyRouterContext {
  queryClient: QueryClient
  authContext: TAuthContext
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <RootLayout>
      <Header />
      <Toaster />
      <Outlet />
      <ShadcnToaster />

      <DevTools />
    </RootLayout>
  ),
})

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <HeaderProvider>
      <SessionLayout>
        <SocketProvider>{children}</SocketProvider>
      </SessionLayout>
    </HeaderProvider>
  )
}

function DevTools() {
  return (
    <TanStackDevtools
      config={{
        position: 'bottom-right',
      }}
      plugins={[
        {
          name: 'Tanstack Router',
          render: <TanStackRouterDevtoolsPanel />,
        },
        TanStackQueryDevtools,
      ]}
    />
  )
}
