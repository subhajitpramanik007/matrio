import { useState } from 'react'
import { createReactContext } from '@/lib/create-react-context'

type TGamePreviewData = {
  gameName: string
  description: string
  href: string
  tag: string
}

const GamePreviewContext = createReactContext<TGamePreviewData | undefined>(
  () => {
    const [gamePreview, _] = useState<TGamePreviewData>()

    return gamePreview
  },
  { name: 'GamePreview' },
)

export const GamePreviewProvider = GamePreviewContext.Provider
export const useGamePreview = () => GamePreviewContext.useReactContext()
