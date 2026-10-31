// Describe una consulta guardada por el servicio de historial.
export interface SearchHistoryEntry {
  id: number
  userId: number | null
  userIdentifier: string
  searchType: string
  queryValue: string
  endpoint: string
  success: boolean
  statusCode: number | null
  errorMessage: string | null
  createdAt: string
}

// Traduce la categoría técnica a una etiqueta legible.
export function translateSearchType(type: string): string {
  const labels: Record<string, string> = { pagination:'Paginación', detail:'Detalle Pokémon', search:'Búsqueda', abilities:'Habilidades', moves:'Movimientos', types:'Tipos' }
  return labels[type] ?? type
}
