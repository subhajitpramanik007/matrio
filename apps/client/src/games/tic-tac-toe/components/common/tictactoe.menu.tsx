import * as React from 'react'
import { BadgePlusIcon, LogOut, MenuIcon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface TTTMenuButtonProps {
  children?: React.ReactNode
  onNewGame: () => void
  onExit: () => void
}

export const TTTMenuButton: React.FC<TTTMenuButtonProps> = ({
  children,
  onNewGame,
  onExit,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="absolute top-2 left-2 cursor-pointer"
      >
        <Button variant="outline">
          <MenuIcon className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={onNewGame}>
          <BadgePlusIcon className="size-5" />
          New Game
        </DropdownMenuItem>
        {children}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onExit}>
          <LogOut className="size-5" />
          Exit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
