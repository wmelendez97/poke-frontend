import type { AxiosResponse } from 'axios'
import httpClient from '../../core/api/httpClient'
import type { ApiResponse } from '../../core/api/apiResponse.model'
import type { PokemonByType, PokemonType } from './types.model'

// Consulta la lista de tipos de Pokémon.
export async function getPokemonTypes(): Promise<PokemonType[]> {
  const response: AxiosResponse<ApiResponse<PokemonType[]>> = await httpClient.get('/types')
  return response.data.data ?? []
}

// Consulta los Pokémon relacionados con el tipo indicado.
export async function getPokemonByType(name: string): Promise<PokemonByType[]> {
  const response: AxiosResponse<ApiResponse<PokemonByType[]>> = await httpClient.get(`/types/${encodeURIComponent(name)}/pokemon`)
  return response.data.data ?? []
}
