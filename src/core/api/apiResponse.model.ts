// Describe la envoltura estándar de las respuestas del backend.
export interface ApiResponse<T> {
  data: T | null
  success: boolean
  message: string
  code: number
  status: string
  errors: Array<{ code: string; detail: string }>
}

// Devuelve un mensaje seguro para errores HTTP o de conexión.
export function getErrorMessage(error: unknown, fallback: string): string {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = (error as { response?: { data?: ApiResponse<unknown> } }).response
    const apiResponse = response?.data
    if (apiResponse && !apiResponse.success && apiResponse.message) return apiResponse.message
    return fallback
  }
  if (error instanceof Error && error.message && error.name !== 'AxiosError') return error.message
  return fallback
}
