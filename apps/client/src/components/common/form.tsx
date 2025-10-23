import * as React from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import type { ControllerRenderProps } from 'react-hook-form'
import { cn } from '@/lib/utils'

export const FormInputField: React.FC<
  ControllerRenderProps & {
    label: string
    placeholder?: string
    description?: string
    className?: string
  }
> = ({ label, placeholder, description, className, ...field }) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input {...field} placeholder={placeholder} className={cn(className)} />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}

export const FormPasswordInputField: React.FC<
  ControllerRenderProps & {
    label?: string
    placeholder?: string
    className?: string
  }
> = ({
  label = 'Password',
  placeholder = 'Enter your password',
  className,
  ...field
}) => {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <div className="relative">
        <FormControl>
          <Input
            {...field}
            placeholder={placeholder}
            type={showPassword ? 'text' : 'password'}
            className={cn('pr-8', className)}
            data-slot="password-input"
          />
        </FormControl>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-muted-foreground absolute top-1/2 right-1 -translate-y-1/2 text-sm"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOffIcon className="size-4" />
          ) : (
            <EyeIcon className="size-4" />
          )}
        </Button>
      </div>
      <FormMessage />
    </FormItem>
  )
}

export const FormCheckboxField: React.FC<
  ControllerRenderProps & {
    label?: string
    children?: React.ReactNode
  }
> = ({ label, children, ...field }) => {
  return (
    <FormItem>
      <div className="flex gap-3">
        <FormControl>
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
        </FormControl>
        <FormLabel>
          {label}
          {children}
        </FormLabel>
      </div>
      <FormMessage />
    </FormItem>
  )
}
