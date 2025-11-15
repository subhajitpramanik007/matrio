import * as React from 'react'

export type DisplayChildProps<T> = T extends object ? { [key in keyof T]: T[key] } : T

export type DisplayThisProps<T> = {
  when: T | null | undefined | false
  children: React.ReactElement<DisplayChildProps<T>> | ((data: T) => React.ReactNode)
  fallback?: React.ReactNode
}

export const DisplayThis = <T,>({ when, children, fallback = null }: DisplayThisProps<T>) => {
  if (!when) return <>{fallback}</>

  if (typeof children === 'function') {
    return <>{(children as (data: T) => React.ReactNode)(when)}</>
  }

  return React.cloneElement(children, { ...when })
}

// Array
export type ArrayProps<T> = {
  data: T[] | null | undefined
  render: (item: T, index: number) => React.ReactNode
}

export const DisplayArray = <T,>({ data, render }: ArrayProps<T>) => {
  if (!data || data.length === 0) return null
  return <>{data.map((item, index) => render(item, index))}</>
}

// 2D Array
export type Array2DProps<T> = {
  data: T[][] | null | undefined
  render: (item: T, rowIdx: number, colIdx: number) => React.ReactNode
}

export const DisplayArray2D = <T,>({ data, render }: Array2DProps<T>) => {
  if (!data || data.length === 0) return null
  return (
    <DisplayArray
      data={data}
      render={(item, rowIdx) => (
        <DisplayArray
          key={rowIdx}
          data={item}
          render={(colItem, colIdx) => render(colItem, rowIdx, colIdx)}
        />
      )}
    />
  )
}
