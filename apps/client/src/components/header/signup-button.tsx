import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

type SignupButtonProps =
  | {
      asChild?: false
      text?: string
      children?: never
    }
  | {
      asChild: true
      text?: never
      children: React.ReactNode
    }

export const SignupButton: React.FC<SignupButtonProps> = ({
  asChild = false,
  text = 'Create New Account',
  children,
}) => {
  const Comp = asChild ? Link : Button

  if (asChild) {
    return <Comp to="/signup">{children}</Comp>
  }

  return (
    <Link to="/signup">
      <Button>{text}</Button>
    </Link>
  )
}
