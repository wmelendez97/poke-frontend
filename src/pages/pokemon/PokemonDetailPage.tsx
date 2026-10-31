import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { getErrorMessage } from '../../core/api/apiResponse.model'
import { StatusPanel } from '../../shared/components/status-panel/StatusPanel'
import { getPokemonAbilities, getPokemonDetail, getPokemonMoves } from './pokemon.service'
import type { Pokemon } from './pokemon.model'
import { getPokemonTypeColor, translatePokemonType } from './pokemon.model'

const statLabels: Record<string, string> = { hp:'PS', attack:'Ataque', defense:'Defensa', 'special-attack':'Ataque especial', 'special-defense':'Defensa especial', speed:'Velocidad' }

// Presenta los datos del detalle y carga habilidades o movimientos a petición.
export function PokemonDetailPage() {
  const { pokemonId = '' } = useParams()
  const location = useLocation()
  const backLocation = location.state?.from as { pathname?: string; search?: string } | undefined
  const backPath = `${backLocation?.pathname ?? '/pokemon'}${backLocation?.search ?? ''}`
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [abilities, setAbilities] = useState<NonNullable<Pokemon['abilities']> | null>(null)
  const [moves, setMoves] = useState<Array<{ id?: number | null; name: string }> | null>(null)
  const [abilitiesError, setAbilitiesError] = useState('')
  const [movesError, setMovesError] = useState('')
  const [abilitiesLoading, setAbilitiesLoading] = useState(false)
  const [movesLoading, setMovesLoading] = useState(false)

  useEffect(() => {
    let active = true
    // Obtiene la ficha y descarta respuestas tras desmontar la ruta.
    async function loadPokemon() {
      setLoading(true)
      setError('')
      try {
        const result = await getPokemonDetail(pokemonId)
        if (active) setPokemon(result)
      } catch (cause) {
        if (active) setError(getErrorMessage(cause, 'No se pudo cargar esta ficha. Comprueba el nombre o identificador.'))
      } finally {
        if (active) setLoading(false)
      }
    }
    void loadPokemon()
    return () => { active = false }
  }, [pokemonId])

  // Consulta habilidades solo cuando la persona expande esa sección.
  async function loadAbilities() {
    if (abilities || abilitiesLoading) return
    setAbilitiesLoading(true)
    setAbilitiesError('')
    try { setAbilities(await getPokemonAbilities(pokemonId)) }
    catch (cause) { setAbilitiesError(getErrorMessage(cause, 'No pudimos cargar las habilidades.')) }
    finally { setAbilitiesLoading(false) }
  }

  // Consulta movimientos solo cuando la persona expande esa sección.
  async function loadMoves() {
    if (moves || movesLoading) return
    setMovesLoading(true)
    setMovesError('')
    try { setMoves(await getPokemonMoves(pokemonId)) }
    catch (cause) { setMovesError(getErrorMessage(cause, 'No pudimos cargar los movimientos.')) }
    finally { setMovesLoading(false) }
  }

  if (loading) return <StatusPanel title="Cargando ficha" message="Consultando la información del Pokémon." />
  if (error || !pokemon) return <StatusPanel title="No pudimos cargar este Pokémon" message={error || 'El Pokémon no está disponible.'} error action={<Link className="button" to="/pokemon">Volver a la Pokédex</Link>} />

  return (
    <>
      <header className="page-header"><Link className="button button-secondary" to={backPath}>← Pokédex</Link></header>
      <section className="detail-grid">
        <div className="panel detail-hero">{pokemon.imageUrl ? <img className="pokemon-image" src={pokemon.imageUrl} alt={`Imagen de ${pokemon.name}`} /> : <span className="pokemon-image-placeholder" aria-label="Imagen no disponible">◉</span>}</div>
        <article className="panel detail-summary">
          <span className="pokemon-number">N.º {String(pokemon.id ?? '—').padStart(3, '0')}</span>
          <h1>{pokemon.name}</h1>
          <div className="type-list" aria-label="Tipos Pokémon">{(pokemon.types ?? []).map((type) => <span key={type} className="type-badge" style={{ backgroundColor: getPokemonTypeColor(type) }}>{translatePokemonType(type)}</span>)}</div>
          <div className="detail-metrics">
            <div className="metric"><strong>{pokemon.height == null ? 'No disponible' : `${(pokemon.height / 10).toFixed(1)} m`}</strong><span>Altura</span></div>
            <div className="metric"><strong>{pokemon.weight == null ? 'No disponible' : `${(pokemon.weight / 10).toFixed(1)} kg`}</strong><span>Peso</span></div>
            <div className="metric"><strong>{pokemon.baseExperience ?? 'No disponible'}</strong><span>Experiencia base</span></div>
          </div>
        </article>
      </section>
      <div className="section-stack">
        <section className="panel data-section"><h2>Estadísticas</h2>
          {pokemon.stats?.length ? <div className="data-list">{pokemon.stats.map((stat) => <div className="data-row" key={stat.name}><span>{statLabels[stat.name] ?? stat.name}</span><strong>{stat.baseStat ?? '—'}</strong></div>)}</div> : <p>Estadísticas no disponibles.</p>}
        </section>
        <section className="panel data-section"><h2>Habilidades</h2>
          {abilities === null ? <button type="button" className="button button-secondary" onClick={loadAbilities} disabled={abilitiesLoading}>{abilitiesLoading ? 'Cargando…' : 'Ver habilidades'}</button> : abilities.length ? <div className="data-list">{abilities.map((item, index) => <div className="data-row" key={`${item.name}-${index}`}><span>{item.name}{item.isHidden ? ' · Oculta' : ''}</span><strong>{item.slot ? `Posición ${item.slot}` : ''}</strong></div>)}</div> : <p>No hay habilidades disponibles.</p>}
          {abilitiesError && <p className="field-error" role="alert">{abilitiesError} <button className="button button-secondary" onClick={loadAbilities}>Reintentar</button></p>}
        </section>
        <section className="panel data-section"><h2>Movimientos</h2>
          {moves === null ? <button type="button" className="button button-secondary" onClick={loadMoves} disabled={movesLoading}>{movesLoading ? 'Cargando…' : 'Ver movimientos'}</button> : moves.length ? <div className="data-list">{moves.slice(0, 40).map((move, index) => <div className="data-row" key={`${move.id ?? move.name}-${index}`}><span>{move.name}</span>{move.id && <strong>#{move.id}</strong>}</div>)}</div> : <p>No hay movimientos disponibles.</p>}
          {movesError && <p className="field-error" role="alert">{movesError} <button className="button button-secondary" onClick={loadMoves}>Reintentar</button></p>}
          {moves && moves.length > 40 && <p>Mostrando 40 de {moves.length} movimientos.</p>}
        </section>
      </div>
    </>
  )
}
