import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function randomDelay(min: number = 100, max: number = 2000) {
  return delay(Math.floor(Math.random() * (max - min + 1)) + min)
}

export function getAccessToken(): string | null {
  try {
    const stored = localStorage.getItem('__matrio.atk')
    if (!stored) throw new Error('No access token')

    const parsed = JSON.parse(stored)
    if (
      parsed &&
      typeof parsed === 'object' &&
      'accessToken' in parsed &&
      typeof parsed.accessToken === 'string'
    ) {
      return parsed.accessToken
    }

    throw new Error('Invalid access token')
  } catch (error) {
    console.error('Failed to parse access token from localStorage:', error)
    return null
  }
}

// eslint-disable-next-line
export type Slugify<S extends string, Sep extends string> =
  Lowercase<S> extends infer L extends string
    ? L extends `${infer A} ${infer B}`
      ? `${Slugify<A, Sep>}${Sep}${Slugify<B, Sep>}`
      : L
    : never

type Direction = 'top' | 'bottom' | 'left' | 'right'

export function getSpiralOrderIndices(size: number) {
  const order: [number, number, Direction][] = []
  let top = 0
  let bottom = size - 1
  let left = 0
  let right = size - 1

  while (top <= bottom && left <= right) {
    // left → right
    for (let i = left; i <= right; i++) order.push([top, i, 'left'])
    top++

    // top → bottom
    for (let i = top; i <= bottom; i++) order.push([i, right, 'top'])
    right--

    // right → left
    if (top <= bottom) {
      for (let i = right; i >= left; i--) order.push([bottom, i, 'right'])
      bottom--
    }

    // bottom → top
    if (left <= right) {
      for (let i = bottom; i >= top; i--) order.push([i, left, 'bottom'])
      left++
    }
  }

  return order
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T
}

export type SlugToTitle<
  TSlug extends string,
  TSeparator extends string = '-',
> = TSlug extends `${infer A}${TSeparator}${infer B}`
  ? `${Capitalize<A>} ${SlugToTitle<B>}`
  : Capitalize<TSlug>

export type NestedKeys<T> = {
  [K in keyof T]: T[K] extends object ? NestedKeys<T[K]> : K
}[keyof T]

export type NestedKeysOf<T> = T extends object ? NestedKeys<T> : never

export type NestedKeysValue<T extends object, TKey extends string> = T extends {
  [K in TKey]: infer V
}
  ? V
  : never

export type FlattenedPaths<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${FlattenedPaths<T[K]>}`
          : `${K}`
        : never
    }[keyof T]
  : never

export function slugToTitle<T extends string, TSeparator extends '-' = '-'>(
  slug: T,
  separator?: TSeparator,
): SlugToTitle<T, TSeparator> {
  return slug
    .split(separator ?? '-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') as SlugToTitle<T, TSeparator>
}

export function slugify<T extends string, TSeparator extends string = '-'>(
  title: T,
  separator?: TSeparator,
): Slugify<T, TSeparator> {
  return title
    .toLowerCase()
    .split(' ')
    .join(separator ?? '-') as Slugify<T, TSeparator>
}
