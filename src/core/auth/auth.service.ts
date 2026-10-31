import type { AxiosResponse } from 'axios'
import httpClient from '../api/httpClient'
import type { ApiResponse } from '../api/apiResponse.model'
import type { AuthResponse, LoginRequest, User } from './auth.model'

// Inicia sesión y devuelve el token y el usuario del backend.
export async function login(request: LoginRequest): Promise<AuthResponse> {
  const response: AxiosResponse<ApiResponse<AuthResponse>> = await httpClient.post('/auth/login', request)
  if (!response.data.data?.token) throw new Error(response.data.message || 'No fue posible iniciar sesión.')
  return response.data.data
}

// Consulta la identidad asociada al token actual.
export async function getCurrentUser(): Promise<User> {
  const response: AxiosResponse<ApiResponse<User>> = await httpClient.get('/auth/me')
  if (!response.data.data) throw new Error(response.data.message || 'No se pudo validar la sesión.')
  return response.data.data
}
