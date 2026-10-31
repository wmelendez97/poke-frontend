import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import { clearSessionToken, getSessionToken, setSessionToken } from '../../shared/utils/session.util'
import type { LoginRequest, User } from './auth.model'
import { getCurrentUser, login as loginRequest } from './auth.service'
import { AuthContext } from './auth.context'

// Comprueba la sesión guardada y comparte las acciones de acceso.
export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    let active = true
    // Restaura al usuario si la pestaña conserva un token válido.
    async function restoreSession() {
      const token = getSessionToken()
      if (!token) {
        if (active) setIsInitializing(false)
        return
      }
      try {
        const authenticatedUser = await getCurrentUser()
        if (active) setUser(authenticatedUser)
      } catch {
        clearSessionToken()
      } finally {
        if (active) setIsInitializing(false)
      }
    }
    void restoreSession()
    return () => { active = false }
  }, [])

  // Autentica al usuario y persiste su token de sesión.
  const signIn = useCallback(async (request: LoginRequest): Promise<void> => {
    const session = await loginRequest(request)
    setSessionToken(session.token)
    setUser(session.user)
  }, [])

  // Cierra la sesión local y elimina sus credenciales.
  const signOut = useCallback((): void => {
    clearSessionToken()
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, isInitializing, signIn, signOut }), [user, isInitializing, signIn, signOut])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

