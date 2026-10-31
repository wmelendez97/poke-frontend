import type { InternalAxiosRequestConfig } from 'axios'
import { clearSessionToken, getSessionToken } from '../../shared/utils/session.util'

// Añade el JWT a llamadas protegidas y cierra sesiones rechazadas por el backend.
export function installAuthInterceptors(client: import('axios').AxiosInstance): void {
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getSessionToken()
    if (token) config.headers.set('Authorization', `Bearer ${token}`)
    return config
  })
  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      const status = typeof error === 'object' && error !== null && 'response' in error
        ? (error as { response?: { status?: number } }).response?.status
        : undefined
      if (status === 401) {
        clearSessionToken()
        if (window.location.pathname !== '/login') window.location.assign('/login')
      }
      return Promise.reject(error)
    },
  )
}
