import { createContext } from 'react'
import type { LoginRequest, User } from './auth.model'

export interface AuthContextValue {
  user: User | null
  isInitializing: boolean
  signIn: (request: LoginRequest) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
