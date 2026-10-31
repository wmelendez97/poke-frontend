import type { RouteObject } from 'react-router-dom'
import { HistoryPage } from './HistoryPage'

// Declara la pantalla de historial de consultas.
export const historyRoutes: RouteObject[] = [{ path: 'historial', element: <HistoryPage /> }]
