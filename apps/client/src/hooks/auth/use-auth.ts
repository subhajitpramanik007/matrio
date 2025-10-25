import { AuthContext } from '@/lib/contexts/auth-context'

export const useAuth = () => AuthContext.useReactContext()
