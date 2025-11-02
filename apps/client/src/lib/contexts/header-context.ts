import { useCallback, useEffect, useState } from 'react'
import { useLocation } from '@tanstack/react-router'
import { createReactContext } from '../create-react-context'

type TTitle = string | null

export type THeaderContext = {
  title: TTitle
  updateTitle: (title?: TTitle) => void
}

export const HeaderContext = createReactContext<THeaderContext>(
  () => {
    const location = useLocation()
    const [title, setTitle] = useState<TTitle>(null)

    const updateTitle = useCallback((currentTitle?: TTitle) => {
      if (currentTitle) setTitle(currentTitle)
    }, [])

    useEffect(() => {
      const pathname = location.pathname
      const currentTitle = pathname.split('/').pop()
      const parsedTitle = currentTitle?.split('-').join(' ')

      if (parsedTitle) setTitle(parsedTitle)
    }, [location.pathname])

    return { title, updateTitle }
  },
  { name: 'Header' },
)

export const HeaderProvider = HeaderContext.Provider
