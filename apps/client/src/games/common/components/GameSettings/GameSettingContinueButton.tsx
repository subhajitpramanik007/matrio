import { ArrowRightIcon } from 'lucide-react'
import type { GameSettingContinueButtonProps } from '@/games/common/types'
import { useGameSettingCanProcess, useGameSettingContinue } from '@/games/common/hooks'

import { Button } from '@/components/ui/button'

export const GameSettingContinueButton: React.FC<GameSettingContinueButtonProps> = (settings) => {
  const isCanContinue = useGameSettingCanProcess(settings)
  const { onContinue } = useGameSettingContinue(settings)

  return (
    <Button
      onClick={onContinue}
      disabled={!isCanContinue}
      className="w-full max-w-3xs"
      color="orange"
    >
      Continue <ArrowRightIcon className="size-4" />
    </Button>
  )
}
