import * as React from 'react'
import { createReactContext } from '@/lib/create-react-context'

interface GameSettingLayoutContextProps {
  isSettingDone: boolean
}

export const GameSettingLayoutContext = createReactContext<GameSettingLayoutContextProps>(
  () => {
    const [isSettingDone, setIsSettingDone] = React.useState(false)

    React.useEffect(() => {
      setIsSettingDone(true)

      return () => setIsSettingDone(false)
    }, [])

    return {
      isSettingDone,
      setIsSettingDone,
    }
  },
  { name: 'GameSettingLayout' },
)

export const GameSettingLayoutContextProvider = GameSettingLayoutContext.Provider
