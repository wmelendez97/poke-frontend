import type { RouteObject } from 'react-router-dom'
import { Login } from './login/Login'

// Declara la pantalla pública de autenticación.
export const authRoutes: RouteObject[] = [{ path: 'login', element: <Login /> }]
