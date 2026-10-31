import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getErrorMessage } from '../../core/api/apiResponse.model'
import { StatusPanel } from '../../shared/components/status-panel/StatusPanel'
import { getPokemonByType, getPokemonTypes } from './types.service'
import type { PokemonType } from './types.model'
import { translatePokemonType } from '../pokemon/pokemon.model'
import { PokemonCard } from '../../shared/components/pokemon-card/PokemonCard'
import type { Pokemon } from '../pokemon/pokemon.model'

const PAGE_SIZE = 24

// Muestra los tipos disponibles y sus accesos al catálogo relacionado.
export function TypesPage() {
  const [types, setTypes] = useState<PokemonType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    // Obtiene los tipos y descarta la respuesta cuando sale de la página.
    async function loadTypes() {
      try { const result = await getPokemonTypes(); if (active) setTypes(result) }
      catch (cause) { if (active) setError(getErrorMessage(cause, 'No se pudieron cargar los tipos.')) }
      finally { if (active) setLoading(false) }
    }
    void loadTypes()
    return () => { active = false }
  }, [])

  if (loading) return <StatusPanel title="Cargando tipos" message="Consultando tipos de Pokémon." />
  if (error) return <StatusPanel title="No se pudieron cargar los tipos" message={error} error />
  return <><header className="page-header"><div><h1>Tipos Pokémon</h1><p>Elige un tipo para ver los Pokémon asociados.</p></div></header>{types.length ? <section className="type-grid" aria-label="Tipos Pokémon">{types.map((type) => <Link className="type-card" key={type.id ?? type.name} to={`/tipos/${encodeURIComponent(type.name)}/pokemon`}><span>{translatePokemonType(type.name)}</span><span aria-hidden="true">→</span></Link>)}</section> : <StatusPanel title="Sin tipos disponibles" message="El servicio todavía no devuelve tipos de Pokémon." />}</>
}

// Presenta los Pokémon devueltos por el endpoint de un tipo.
export function PokemonByTypePage() {
  return <PokemonTypeResults />
}

// Carga resultados por el nombre de tipo recibido en la ruta.
function PokemonTypeResults() {
  const { name = '' } = useParams()
  const [items, setItems] = useState<Pokemon[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    // Consulta resultados y descarta respuestas cuando cambia el tipo.
    async function loadResults() {
      try { const result = await getPokemonByType(name); if (active) setItems(result) }
      catch (cause) { if (active) setError(getErrorMessage(cause, 'No se pudieron cargar los resultados.')) }
      finally { if (active) setLoading(false) }
    }
    void loadResults()
    return () => { active = false }
  }, [name])

  if (loading) return <StatusPanel title="Cargando Pokémon" message="Buscando resultados para este tipo." />
  if (error) return <StatusPanel title="Falló la consulta" message={error} error />
  const pageCount = Math.ceil(items.length / PAGE_SIZE)
  const visibleItems = items.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  return <><header className="page-header"><div><h1>Pokémon de tipo {translatePokemonType(name)}</h1><p>{items.length} resultados recibidos</p></div><Link className="button button-secondary" to="/tipos">Volver a tipos</Link></header>{items.length ? <><section className="pokemon-grid">{visibleItems.map((pokemon, index) => <PokemonCard key={pokemon.id ?? `${pokemon.name}-${index}`} item={pokemon} />)}</section>{pageCount > 1 && <nav className="pagination" aria-label="Páginas de resultados"><button className="button button-secondary" disabled={page === 0} onClick={() => setPage(page - 1)}>Anterior</button><span>Página {page + 1} de {pageCount}</span><button className="button button-secondary" disabled={page + 1 >= pageCount} onClick={() => setPage(page + 1)}>Siguiente</button></nav>}</> : <StatusPanel title="Sin resultados" message="El backend no devolvió Pokémon para este tipo." />}</>
}
