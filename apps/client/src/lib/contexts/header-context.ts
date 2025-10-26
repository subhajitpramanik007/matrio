import { useCallback, useEffect, useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { createReactContext } from '../create-react-context'

type TTitle = string | null

export type THeaderContext = {
  title: TTitle
  updateTitle: (title?: TTitle) => void
}

export const HeaderContext = createReactContext<THeaderContext>(
  () => {
    const router = useRouter()
    const [title, setTitle] = useState<TTitle>(null)

    const updateTitle = useCallback((currentTitle?: TTitle) => {
      if (currentTitle) setTitle(currentTitle)
    }, [])

    useEffect(() => {
      const handleRouteChange = () => {
        const currentTitle = router.latestLocation.pathname
          .split('/')
          .pop()
          ?.split('-')
          .join(' ')

        updateTitle(currentTitle)
      }

      handleRouteChange()

      return () => {}
    }, [router])

    return { title, updateTitle }
  },
  { name: 'Header' },
)

export const HeaderProvider = HeaderContext.Provider
