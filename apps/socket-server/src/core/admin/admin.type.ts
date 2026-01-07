export type AdminLoggerLevel = 'info' | 'error' | 'warn'

type AdminEventAction = 'added' | 'removed'
type AdminEventSubject = 'players' | 'rooms'

type AdminStandardEvent = `${AdminEventSubject}:${AdminEventAction}`
type AdminCustomEvent = `${AdminEventSubject}:${string & {}}`
type AdminSystemEvent = 'system'

export type AdminEvent = AdminStandardEvent | AdminCustomEvent | AdminSystemEvent
