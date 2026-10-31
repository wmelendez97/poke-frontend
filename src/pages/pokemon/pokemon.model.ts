// Describe las filas breves del catálogo paginado.
export interface PokemonPageItem {
  id: number | null
  name: string
}

// Describe los datos disponibles en el detalle de un Pokémon.
export interface Pokemon {
  id: number | null
  name: string
  url?: string | null
  height?: number | null
  weight?: number | null
  baseExperience?: number | null
  imageUrl?: string | null
  types?: string[] | null
  abilities?: Array<{ id?: number | null; name: string; isHidden?: boolean | null; slot?: number | null }> | null
  stats?: Array<{ name: string; baseStat: number | null; effort: number | null }> | null
}

// Describe la página de catálogo que devuelve el backend.
export interface PokemonPageResponse {
  content: PokemonPageItem[]
  totalPages: number
  totalElements: number
  numberOfElements: number
  size: number
}

// Devuelve una etiqueta española para el nombre de tipo recibido.
export function translatePokemonType(type: string): string {
  const labels: Record<string, string> = { normal:'Normal', fire:'Fuego', water:'Agua', electric:'Eléctrico', grass:'Planta', ice:'Hielo', fighting:'Lucha', poison:'Veneno', ground:'Tierra', flying:'Volador', psychic:'Psíquico', bug:'Bicho', rock:'Roca', ghost:'Fantasma', dragon:'Dragón', dark:'Siniestro', steel:'Acero', fairy:'Hada' }
  return labels[type.toLowerCase()] ?? type
}

// Devuelve el acento visual asignado al tipo de Pokémon.
export function getPokemonTypeColor(type: string): string {
  const colors: Record<string, string> = { normal:'#e5e7eb',fire:'#ffe0cc',water:'#d8ecff',electric:'#fff2b3',grass:'#dff0d5',ice:'#ddf5f5',fighting:'#f4d5cf',poison:'#ecdcf5',ground:'#f0e4c8',flying:'#e3e8fa',psychic:'#fadbe7',bug:'#e9efcb',rock:'#e7e1d0',ghost:'#e3def2',dragon:'#dddffa',dark:'#dfdbd8',steel:'#e1e8ed',fairy:'#f7deef' }
  return colors[type.toLowerCase()] ?? '#e5e7eb'
}
