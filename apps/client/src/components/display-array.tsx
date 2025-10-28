import React from 'react'

interface DisplayArrayProps<T> {
  array: readonly T[]
  className?: string
  /**
   * Render each element of the array.
   * You can also use the index if needed.
   */
  render: (element: T, index: number) => React.ReactNode
}

/**
 * A generic component that renders an array of items using a render function.
 */
export function DisplayArray<T>({
  array,
  className,
  render,
}: DisplayArrayProps<T>): React.ReactElement | null {
  if (!array.length) return null

  return (
    <div data-slot="display-array" className={className}>
      {array.map((element, index) => (
        <React.Fragment key={index}>{render(element, index)}</React.Fragment>
      ))}
    </div>
  )
}
