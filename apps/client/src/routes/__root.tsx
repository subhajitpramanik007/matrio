import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Toaster } from 'react-hot-toast'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import type { TAuthContext } from '@/types'
import type { QueryClient } from '@tanstack/react-query'
import { HeaderContext } from '@/lib/contexts/header-context'

import { Header } from '@/components/header/Header'
import { SessionLayout } from '@/components/session-layout'

interface MyRouterContext {
  queryClient: QueryClient
  authContext: TAuthContext
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <HeaderContext.Provider>
      <SessionLayout>
        <Header />
        <Toaster />
        <Outlet />
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
      </SessionLayout>
    </HeaderContext.Provider>
  ),
})
