import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type GamePreviewCardProps = React.ComponentProps<typeof Card>

export const GamePreviewCard: React.FC<GamePreviewCardProps> = (props) => {
  return (
    <Card
      data-slot="game-preview-card"
      {...props}
      className={cn(
        '"group hover:shadow-lg" w-full max-w-md cursor-pointer transition-all duration-300',
        props.className,
      )}
    />
  )
}

export const GamePreviewCardHeader: React.FC<{
  gameName: string
  tag: string
  description: string
}> = ({ gameName, tag, description }) => {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="text-2xl">{gameName}</CardTitle>
        <Badge>{tag}</Badge>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  )
}

export const GamePreviewCardContent: React.FC<{
  children: React.ReactNode
  className?: string
  gameName: string
  href: string
}> = ({ children, className, gameName, href }) => {
  return (
    <CardContent>
      <div
        className={cn(
          'mx-auto mb-6 grid max-w-48 grid-cols-3 gap-2',
          className,
        )}
      >
        {children}
      </div>
      <Link to="/games/$game" params={{ game: href }}>
        <Button className="group-hover:bg-primary/90 w-full transition-colors">
          Play {gameName}
        </Button>
      </Link>
    </CardContent>
  )
}
