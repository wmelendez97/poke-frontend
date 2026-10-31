import type { AxiosResponse } from 'axios'
import httpClient from '../../core/api/httpClient'
import type { ApiResponse } from '../../core/api/apiResponse.model'
import type { Pokemon, PokemonPageResponse } from './pokemon.model'

const detailCache = new Map<string, Promise<Pokemon>>()
let activeDetailRequests = 0
const queuedDetailRequests: Array<() => void> = []

// Limita las consultas de detalle simultáneas y libera la siguiente al terminar.
function queueDetailRequest<T>(request: () => Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const start = () => {
      activeDetailRequests += 1
      void request().then(resolve, reject).finally(() => {
        activeDetailRequests -= 1
        queuedDetailRequests.shift()?.()
      })
    }
    if (activeDetailRequests < 3) start()
    else queuedDetailRequests.push(start)
  })
}

// Recupera una página del catálogo con sus parámetros propios.
export async function getPokemonPage(limit: number, offset: number): Promise<PokemonPageResponse> {
  const response: AxiosResponse<ApiResponse<PokemonPageResponse>> = await httpClient.get('/pokemon', { params: { limit, offset } })
  if (!response.data.data) throw new Error(response.data.message || 'No se pudo cargar el catálogo.')
  return response.data.data
}

// Busca coincidencias por nombre en caché local y proveedor.
export async function searchPokemon(name: string): Promise<Pokemon[]> {
  const response: AxiosResponse<ApiResponse<Pokemon[]>> = await httpClient.get('/pokemon/search', { params: { name } })
  return response.data.data ?? []
}

// Recupera el detalle una sola vez y lo reutiliza como caché de sesión.
export function getPokemonDetail(idOrName: string | number): Promise<Pokemon> {
  const key = String(idOrName).toLowerCase()
  const cached = detailCache.get(key)
  if (cached) return cached
  const request = queueDetailRequest(async () => {
    const response: AxiosResponse<ApiResponse<Pokemon>> = await httpClient.get(`/pokemon/${encodeURIComponent(key)}`)
    if (!response.data.data) throw new Error(response.data.message || 'No se pudo cargar el Pokémon.')
    return response.data.data
  })
  detailCache.set(key, request)
  void request.catch(() => detailCache.delete(key))
  return request
}

// Recupera las habilidades disponibles para un Pokémon.
export async function getPokemonAbilities(idOrName: string | number): Promise<NonNullable<Pokemon['abilities']>> {
  const response: AxiosResponse<ApiResponse<NonNullable<Pokemon['abilities']>>> = await httpClient.get(`/pokemon/${encodeURIComponent(String(idOrName))}/abilities`)
  return response.data.data ?? []
}

// Recupera los movimientos disponibles para un Pokémon.
export async function getPokemonMoves(idOrName: string | number): Promise<Array<{ id?: number | null; name: string }>> {
  const response: AxiosResponse<ApiResponse<Array<{ id?: number | null; name: string }>>> = await httpClient.get(`/pokemon/${encodeURIComponent(String(idOrName))}/moves`)
  return response.data.data ?? []
}
