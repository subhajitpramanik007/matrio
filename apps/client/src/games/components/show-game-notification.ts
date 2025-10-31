import { toast } from 'sonner'

type Message = string | number | bigint | boolean

export const showGameNotification = (
  message: Message,
  description?: string,
  duration?: number,
) => toast.success(message, { description, position: 'top-center', duration })

export const showGameErrorNotification = (
  message: Message,
  description?: string,
  duration?: number,
) => toast.error(message, { description, position: 'top-center', duration })
