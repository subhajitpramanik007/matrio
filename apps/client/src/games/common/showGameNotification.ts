import { toast } from 'sonner'

type Message = string | React.ReactNode

interface TNotification {
  text: Message
  description?: Message
  duration?: number
}

export function showGameNotification(notification: TNotification) {
  return toast(notification.text, {
    description: notification.description,
    duration: notification.duration,
    position: 'top-center',
  })
}

export function showGameErrorNotification(notification: TNotification) {
  return toast.error(notification.text, {
    description: notification.description,
    duration: notification.duration,
    position: 'top-center',
  })
}
