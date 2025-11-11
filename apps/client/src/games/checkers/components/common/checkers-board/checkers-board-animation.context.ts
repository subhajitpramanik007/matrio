import React from 'react'
import { createReactContext } from '@/lib/create-react-context'

type CheckersBoardAnimation = 'border' | 'rows' | 'cols' | 'cells'

const ANIMATIONS_STEPS: Record<CheckersBoardAnimation, number> = {
  border: 1,
  rows: 2,
  cols: 3,
  cells: 4,
}

const CheckersBoardAnimationContext = createReactContext(
  () => {
    const [animationStep, setAnimationStep] = React.useState(0)

    const onAnimationDone = (anima: CheckersBoardAnimation) => {
      setAnimationStep(ANIMATIONS_STEPS[anima])
    }

    return {
      isBoardAnimationDone: animationStep >= 1,
      isBoardRowsAnimationDone: animationStep >= 2,
      isBoardColsAnimationDone: animationStep >= 3,
      isBoardCellsAnimationDone: animationStep == 4,
      onAnimationDone,
    }
  },
  {
    name: 'Checkers Board Animation',
  },
)

export const useCheckersBoardAnimation =
  CheckersBoardAnimationContext.useReactContext

export const CheckersBoardAnimationProvider =
  CheckersBoardAnimationContext.Provider
