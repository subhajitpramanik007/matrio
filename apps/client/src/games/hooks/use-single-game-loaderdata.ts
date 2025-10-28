import { useLoaderData } from '@tanstack/react-router'

export function useSingleGameLoaderData() {
  return useLoaderData({ from: '/games/$game' })
}
