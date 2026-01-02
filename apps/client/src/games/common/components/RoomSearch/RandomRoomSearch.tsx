'use client'

import * as React from 'react'
import { useRandomRoomSearch } from '../../hooks/useRoomSearch'

export const RandomRoomSearch: React.FC<{}> = () => {
  const { isError, error } = useRandomRoomSearch()

  if (isError) {
    return <p className="text-destructive">{error}</p>
  }

  return (
    <div>
      <p>Searching random player...</p>
    </div>
  )
}
