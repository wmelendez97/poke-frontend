import type { RouteObject } from 'react-router-dom'
import { PokemonDetailPage } from './PokemonDetailPage'
import { PokemonListPage } from './PokemonListPage'

// Define las rutas de búsqueda, catálogo y detalle Pokémon.
export const pokemonRoutes: RouteObject[] = [
  { path: 'pokemon', element: <PokemonListPage /> },
  { path: 'pokemon/:pokemonId', element: <PokemonDetailPage /> },
]
