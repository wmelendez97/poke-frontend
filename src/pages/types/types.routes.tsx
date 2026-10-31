import type { RouteObject } from 'react-router-dom'
import { PokemonByTypePage, TypesPage } from './TypesPage'

// Define la lista de tipos y la búsqueda por tipo.
export const typesRoutes: RouteObject[] = [
  { path: 'tipos', element: <TypesPage /> },
  { path: 'tipos/:name/pokemon', element: <PokemonByTypePage /> },
]
