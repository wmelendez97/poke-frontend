import type { RouteObject } from 'react-router-dom'
import { Dashboard } from './Dashboard'

// Declara la ruta principal y los accesos de inicio.
export const dashboardRoutes: RouteObject[] = [{ index: true, element: <Dashboard /> }, { path: 'inicio', element: <Dashboard /> }]
