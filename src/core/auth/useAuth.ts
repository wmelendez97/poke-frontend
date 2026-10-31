import { useContext } from 'react'
import { AuthContext, type AuthContextValue } from './auth.context'

// Expone la sesión dentro de rutas y componentes autenticados.
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider.')
  return context
}
