import { Link } from '@tanstack/react-router'
import type React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function AuthLayout({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="auth-layout"
      className={cn(
        'bg-background flex min-h-[calc(100vh-72px)] w-full items-start justify-center py-8 md:pt-16',
        className,
      )}
      {...props}
    />
  )
}

function AuthCard({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="auth-card"
      className={cn(
        'bg-card text-card-foreground flex w-full max-w-md flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

function AuthHeader({
  className,
  title,
  actionText,
  description,
  ...props
}: React.ComponentProps<'div'> & {
  title: string
  actionText: string
  description: string
}) {
  return (
    <div
      data-slot="auth-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    >
      <h1 className="mb-4 text-center text-xl font-semibold">
        {title} <span className="text-primary font-bold">Matrio</span>
      </h1>
      <h2 className="font-semibold' leading-none">{actionText}</h2>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}

function AuthContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="auth-content"
      className={cn('flex flex-col gap-4 px-6', className)}
      {...props}
    />
  )
}

function AuthFooter({
  className,
  footerText,
  footerLink,
  footerLinkText,
  ...props
}: React.ComponentProps<'div'> & {
  footerText?: string
  footerLinkText?: string
  footerLink?: string
}) {
  return (
    <div
      data-slot="auth-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    >
      <div className="flex w-full items-center justify-center">
        <p className="text-muted-foreground text-sm">{footerText}</p>
        <Button variant="link" className="p-1">
          <Link to={footerLink}>{footerLinkText}</Link>
        </Button>
      </div>
    </div>
  )
}

export { AuthLayout, AuthCard, AuthHeader, AuthContent, AuthFooter }
