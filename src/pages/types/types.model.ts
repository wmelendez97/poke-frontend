import type { Pokemon } from '../pokemon/pokemon.model'

// Describe un tipo elemental disponible en el catálogo.
export interface PokemonType {
  id: number
  name: string
}

// Reutiliza datos parciales de Pokémon para los resultados por tipo.
export type PokemonByType = Pokemon
