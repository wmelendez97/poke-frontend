import type { AxiosResponse } from 'axios'
import httpClient from '../../core/api/httpClient'
import type { ApiResponse } from '../../core/api/apiResponse.model'
import type { SearchHistoryEntry } from './history.model'

// Consulta el historial de búsquedas del usuario autenticado.
export async function getUserSearchHistory(userId: number): Promise<SearchHistoryEntry[]> {
  const response: AxiosResponse<ApiResponse<SearchHistoryEntry[]>> = await httpClient.get(`/users/${userId}/search-history`)
  return response.data.data ?? []
}

// Filtra el historial global por fecha, categoría y texto.
export async function getGlobalSearchHistory(filters: { from?: string; to?: string; type?: string; q?: string }): Promise<SearchHistoryEntry[]> {
  const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => Boolean(value)))
  const response: AxiosResponse<ApiResponse<SearchHistoryEntry[]>> = await httpClient.get('/search-history', { params })
  return response.data.data ?? []
}
