import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

export function createReactContext<T>(
  init: () => T,
  options: { name: string; defaultValue?: T | undefined },
) {
  const context = createContext<T | undefined>(options.defaultValue)

  function Provider({
    children,
    defaultValue,
  }: {
    children: ReactNode
    defaultValue?: Partial<T>
  }) {
    const initialValue = init()
    const mergedValue = { ...initialValue, ...defaultValue }

    return <context.Provider value={mergedValue}>{children}</context.Provider>
  }

  function useReactContext() {
    const contextValue = useContext(context)
    if (contextValue === undefined) {
      throw new Error(
        `use${options.name} must be used within a ${options.name}Provider`,
      )
    }
    return contextValue
  }

  return {
    Provider,
    useReactContext,
  }
}
