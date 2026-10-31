import { useRoutes } from 'react-router-dom'
import { AuthGuard } from '../../core/auth/auth.guard'
import { AppLayout } from '../../shared/components/app-layout/AppLayout'
import { authRoutes } from '../../pages/auth/auth.routes'
import { dashboardRoutes } from '../../pages/dashboard/dashboard.routes'
import { historyRoutes } from '../../pages/history/history.routes'
import { NotFoundPage } from '../../pages/not-found/NotFoundPage'
import { pokemonRoutes } from '../../pages/pokemon/pokemon.routes'
import { typesRoutes } from '../../pages/types/types.routes'

// Combina rutas públicas con módulos privados protegidos por sesión.
export function AppRoutes() {
  return useRoutes([
    ...authRoutes,
    { path: '/', element: <AuthGuard />, children: [{ element: <AppLayout />, children: [...dashboardRoutes, ...pokemonRoutes, ...typesRoutes, ...historyRoutes] }] },
    { path: '*', element: <NotFoundPage /> },
  ])
}
