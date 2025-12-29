import { useLoaderData } from '@tanstack/react-router'

export const useGame = () => {
  return useLoaderData({ from: '/games/$game' })
}
