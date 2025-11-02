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
