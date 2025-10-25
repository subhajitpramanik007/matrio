import { Controller } from 'react-hook-form'

import * as React from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

import { cn } from '@/lib/utils'

type FormControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = {
  name: TName
  label: React.ReactNode
  description?: React.ReactNode
  control: ControllerProps<TFieldValues, TName, TTransformedValues>['control']
}

type FormBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = FormControlProps<TFieldValues, TName, TTransformedValues> & {
  horizontal?: boolean
  controlFirst?: boolean
  children: (
    field: Parameters<
      ControllerProps<TFieldValues, TName, TTransformedValues>['render']
    >[0]['field'] & {
      'aria-invalid': boolean
      id: string
    },
  ) => React.ReactNode
}

type FormControlFunc<
  TExtraProps extends Record<string, unknown> = Record<never, never>,
> = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(
  props: FormControlProps<TFieldValues, TName, TTransformedValues> &
    TExtraProps,
) => React.ReactNode

function FormBase<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  children,
  control,
  label,
  name,
  description,
  controlFirst,
  horizontal,
}: FormBaseProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const labelElement = (
          <>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            {description && <FieldDescription>{description}</FieldDescription>}
          </>
        )
        const controlElem = children({
          ...field,
          id: field.name,
          'aria-invalid': fieldState.invalid,
        })
        const errorElem = fieldState.invalid && (
          <FieldError errors={[fieldState.error]} />
        )

        return (
          <Field
            data-invalid={fieldState.invalid}
            orientation={horizontal ? 'horizontal' : undefined}
          >
            {controlFirst ? (
              <>
                {controlElem}
                <FieldContent>
                  {labelElement}
                  {errorElem}
                </FieldContent>
              </>
            ) : (
              <>
                <FieldContent>{labelElement}</FieldContent>
                {controlElem}
                {errorElem}
              </>
            )}
          </Field>
        )
      }}
    />
  )
}

type FormControlFuncInput = FormControlFunc<{
  placeholder?: string
}>

export const FormInput: FormControlFuncInput = (props) => {
  return (
    <FormBase {...props}>
      {(field) => <Input {...field} placeholder={props.placeholder} />}
    </FormBase>
  )
}

export const FormPasswordInput: FormControlFunc = (props) => {
  const [showPassword, setShowPassword] = React.useState(false)

  const inputType = showPassword ? 'text' : 'password'

  const buttonIcon = showPassword ? (
    <EyeOffIcon className="size-4" />
  ) : (
    <EyeIcon className="size-4" />
  )

  return (
    <FormBase {...props}>
      {(field) => {
        return (
          <div className="relative">
            <Input
              {...field}
              type={inputType}
              placeholder="Enter your password"
            />
            <Button
              type="button"
              variant="ghost"
              className="absolute top-1/2 right-0 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {buttonIcon}
            </Button>
          </div>
        )
      }}
    </FormBase>
  )
}

export const FormTextarea: FormControlFunc = (props) => {
  return <FormBase {...props}>{(field) => <Textarea {...field} />}</FormBase>
}

export const FormSelect: FormControlFunc<{ children: React.ReactNode }> = ({
  children,
  ...props
}) => {
  return (
    <FormBase {...props}>
      {({ onChange, onBlur, ...field }) => (
        <Select {...field} onValueChange={onChange}>
          <SelectTrigger
            aria-invalid={field['aria-invalid']}
            id={field.id}
            onBlur={onBlur}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>{children}</SelectContent>
        </Select>
      )}
    </FormBase>
  )
}

export const FormCheckbox: FormControlFunc = (props) => {
  return (
    <FormBase {...props} horizontal controlFirst>
      {({ onChange, value, ...field }) => (
        <Checkbox {...field} checked={value} onCheckedChange={onChange} />
      )}
    </FormBase>
  )
}

export const SubmitButton: React.FC<{
  children: React.ReactNode
  disabled?: boolean
  isLoading?: boolean
  className?: string
}> = ({ children, disabled, className, isLoading }) => {
  return (
    <Button
      type="submit"
      disabled={disabled || isLoading}
      className={cn('w-full', className)}
    >
      {isLoading && <Spinner className="mr-2" />}
      {children}
    </Button>
  )
}
