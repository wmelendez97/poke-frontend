import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './useAuth'
import { StatusPanel } from '../../shared/components/status-panel/StatusPanel'

// Espera la sesión y protege rutas de los servicios autenticados.
export function AuthGuard() {
  const { user, isInitializing } = useAuth()
  const location = useLocation()
  if (isInitializing) return <StatusPanel title="Validando sesión" message="Un momento mientras comprobamos tu acceso." />
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />
  return <Outlet />
}
