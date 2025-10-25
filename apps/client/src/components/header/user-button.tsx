import * as React from 'react'
import { User2Icon } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Theme, useTheme } from '@/components/theme-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth, useSignout } from '@/hooks/auth'

interface UserButtonProps {}

const UserButton: React.FC<UserButtonProps> = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link to="/profile">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <Link to="/dashboard">
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <ThemeDropDown />

        <DropdownMenuSeparator />
        <SignoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function SignoutButton() {
  const { signout } = useSignout()

  return (
    <DropdownMenuItem variant="destructive" onClick={signout}>
      Logout
    </DropdownMenuItem>
  )
}

function ThemeDropDown() {
  const { setTheme, theme: currentTheme } = useTheme()

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        {Theme.map((theme) => (
          <DropdownMenuCheckboxItem
            key={theme}
            checked={theme === currentTheme}
            onCheckedChange={() => setTheme(theme)}
            className="capitalize"
          >
            {theme}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}

function UserAvatar() {
  const { user } = useAuth()

  return (
    <Avatar className="ring-1 ring-orange-300 ring-offset-1">
      <AvatarImage
        loading="lazy"
        src={user?.avatar.url}
        alt={user?.avatar.name}
      />
      <AvatarFallback>
        <User2Icon className="size-5" />
      </AvatarFallback>
    </Avatar>
  )
}

export default UserButton
