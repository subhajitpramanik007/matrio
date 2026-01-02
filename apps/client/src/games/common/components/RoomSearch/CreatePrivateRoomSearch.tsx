'use client'

import * as React from 'react'
import { useCreatePrivateRoomSearch } from '../../hooks/useRoomSearch'

export const CreatePrivateRoomSearch: React.FC<{}> = () => {
  const { isError, error } = useCreatePrivateRoomSearch()

  if (isError) {
    return <p className="text-destructive">{error}</p>
  }

  return (
    <div>
      <p>Creating private room...</p>
    </div>
  )
}
