import { useState } from 'react'
import { createReactContext } from '../create-react-context'

export const HeaderContext = createReactContext(
  () => {
    const [title, setTitle] = useState<string | null>(null)

    const updateTitle = (title?: string) => {
      if (title) setTitle(title)
      else setTitle(null)
    }

    return { title, updateTitle }
  },
  { name: 'Header' },
)
