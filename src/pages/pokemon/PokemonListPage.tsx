import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getErrorMessage } from '../../core/api/apiResponse.model'
import { PokemonCard } from '../../shared/components/pokemon-card/PokemonCard'
import { StatusPanel } from '../../shared/components/status-panel/StatusPanel'
import { getPokemonPage, searchPokemon } from './pokemon.service'
import type { Pokemon, PokemonPageItem, PokemonPageResponse } from './pokemon.model'

const PAGE_SIZE = 12

// Carga catálogo o búsqueda y conserva la consulta en la URL.
export function PokemonListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() ?? ''
  const page = Math.max(0, Number(searchParams.get('page') ?? 0) || 0)
  const [pokemon, setPokemon] = useState<Array<Pokemon | PokemonPageItem>>([])
  const [pageData, setPageData] = useState<PokemonPageResponse | null>(null)
  const [searchText, setSearchText] = useState(query)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    // Carga resultados nuevos cuando cambian búsqueda o página.
    async function loadList() {
      setLoading(true)
      setError('')
      try {
        if (query) {
          const results = await searchPokemon(query)
          if (active) { setPokemon(results); setPageData(null) }
        } else {
          const result = await getPokemonPage(PAGE_SIZE, page * PAGE_SIZE)
          if (active) { setPokemon(result.content); setPageData(result) }
        }
      } catch (cause) {
        if (active) { setError(getErrorMessage(cause, 'No se pudo cargar el catálogo.')); setPokemon([]) }
      } finally {
        if (active) setLoading(false)
      }
    }
    void loadList()
    return () => { active = false }
  }, [query, page])

  // Actualiza los parámetros de la pantalla sin perder su historial de navegación.
  const updateQuery = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next = new URLSearchParams()
    const value = searchText.trim()
    if (value) next.set('q', value)
    setSearchParams(next)
  }, [searchText, setSearchParams])

  // Cambia la página del catálogo conservando los filtros visibles.
  function changePage(nextPage: number) {
    const next = new URLSearchParams(searchParams)
    next.set('page', String(nextPage))
    setSearchParams(next)
  }

  return (
    <>
      <header className="page-header"><div><h1>Pokédex</h1><p>Busca por nombre y descubre los detalles de cada Pokémon.</p></div><Link className="button button-secondary" to="/inicio">Volver al inicio</Link></header>
      <form className="catalog-toolbar" onSubmit={updateQuery} role="search">
        <label className="search-control"><span className="search-icon" aria-hidden="true">⌕</span><span className="visually-hidden">Buscar por nombre de Pokémon</span><input type="search" value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Ejemplo: pikachu" /></label>
        <button className="button" type="submit">Buscar</button>
        {query && <button className="button button-secondary" type="button" onClick={() => { setSearchText(''); setSearchParams({}) }}>Limpiar</button>}
      </form>
      {loading ? <StatusPanel title="Cargando Pokémon" message="Obteniendo la lista desde la Pokédex." />
        : error ? <StatusPanel title="No se pudo completar la consulta" message={error} error action={<button type="button" className="button" onClick={() => setSearchParams(new URLSearchParams(searchParams))}>Reintentar</button>} />
          : pokemon.length === 0 ? <StatusPanel title="No encontramos Pokémon" message={query ? `No hay coincidencias para «${query}».` : 'El catálogo todavía no tiene resultados.'} action={query ? <button type="button" className="button" onClick={() => { setSearchText(''); setSearchParams({}) }}>Ver catálogo</button> : undefined} />
            : <section className="pokemon-grid" aria-label={query ? `Resultados para ${query}` : 'Pokémon'}>{pokemon.map((item, index) => <PokemonCard key={item.id ?? `${item.name}-${index}`} item={item} />)}</section>}
      {!query && !loading && !error && pageData && pageData.totalPages > 1 && (
        <nav className="pagination" aria-label="Páginas del catálogo">
          <button className="button button-secondary" disabled={page === 0} onClick={() => changePage(page - 1)}>Anterior</button>
          <span>Página {page + 1} de {pageData.totalPages} · {pageData.totalElements} Pokémon</span>
          <button className="button button-secondary" disabled={page + 1 >= pageData.totalPages} onClick={() => changePage(page + 1)}>Siguiente</button>
        </nav>
      )}
    </>
  )
}
