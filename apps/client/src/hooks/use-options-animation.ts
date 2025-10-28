import { useState } from 'react'

export const useOptionsAnimation = () => {
  const [currentIdx, setCurrentIdx] = useState<number | null>(null)
  const onMouseEnter = (idx: number) => setCurrentIdx(idx)
  const onMouseLeave = () => setCurrentIdx(null)

  return { currentIdx, onMouseEnter, onMouseLeave }
}
