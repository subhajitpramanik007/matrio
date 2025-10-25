import * as React from 'react'
import { CoinsIcon, PlusIcon } from 'lucide-react'

import { Button } from '../ui/button'
import { useUserData } from '@/hooks/auth'

export const DisplayCoins: React.FC = () => {
  const { data, isLoading } = useUserData()
  const coins = data?.data.user.coins ?? 0

  return (
    <div className="flex items-center justify-center gap-2 rounded-md px-2 py-1 ring-1 ring-orange-500">
      <span className="inline-flex gap-2 text-orange-500">
        {isLoading ? (
          <span>...</span>
        ) : (
          <span className="text-xl font-semibold">{coins}</span>
        )}{' '}
        <CoinsIcon className="mt-1 size-4" />
      </span>
      <Button className="rounded-md p-0" color="orange" size="icon">
        <PlusIcon className="size-4" />
      </Button>
    </div>
  )
}
