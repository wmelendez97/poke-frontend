import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getErrorMessage } from '../../../core/api/apiResponse.model'
import { getPokemonDetail } from '../../../pages/pokemon/pokemon.service'
import type { Pokemon, PokemonPageItem } from '../../../pages/pokemon/pokemon.model'
import { getPokemonTypeColor, translatePokemonType } from '../../../pages/pokemon/pokemon.model'

// Presenta una card accesible y completa sus datos si el catálogo es resumido.
export function PokemonCard({ item }: { item: PokemonPageItem | Pokemon }) {
  const location = useLocation()
  const cardRef = useRef<HTMLElement>(null)
  const [pokemon, setPokemon] = useState<Pokemon>(item)
  const [imageFailed, setImageFailed] = useState(false)
  const [error, setError] = useState('')
  const idOrName = pokemon.id ?? pokemon.name

  useEffect(() => {
    if (pokemon.imageUrl || pokemon.types?.length) return
    let active = true
    const host = cardRef.current
    let observer: IntersectionObserver | null = null
    // Completa imagen y tipos solo al acercarse la card al viewport.
    async function loadVisiblePokemon() {
      try {
        const detail = await getPokemonDetail(idOrName)
        if (active) setPokemon(detail)
      } catch (cause) {
        if (active) setError(getErrorMessage(cause, 'No se pudo cargar la imagen.'))
      }
    }
    if (host && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer?.disconnect()
          void loadVisiblePokemon()
        }
      }, { rootMargin: '160px' })
      observer.observe(host)
    } else void loadVisiblePokemon()
    return () => { active = false; observer?.disconnect() }
  }, [idOrName, pokemon.imageUrl, pokemon.types?.length])

  return (
    <article className="pokemon-card" ref={cardRef}>
      <div className="pokemon-image-wrap">
        {pokemon.imageUrl && !imageFailed
          ? <img className="pokemon-image" src={pokemon.imageUrl} alt={`Imagen de ${pokemon.name}`} loading="lazy" onError={() => setImageFailed(true)} />
          : <span className="pokemon-image-placeholder" aria-hidden="true">◉</span>}
      </div>
      <div className="pokemon-card-content">
        <span className="pokemon-number">N.º {String(pokemon.id ?? '—').padStart(3, '0')}</span>
        <h2>{pokemon.name}</h2>
        <div className="type-list" aria-label="Tipos Pokémon">
          {pokemon.types?.map((type) => <span key={type} className="type-badge" style={{ backgroundColor: getPokemonTypeColor(type) }}>{translatePokemonType(type)}</span>)}
        </div>
        {error && <span className="visually-hidden" role="status">{error}</span>}
        <Link className="button" to={`/pokemon/${encodeURIComponent(String(idOrName))}`} state={{ from: { pathname: location.pathname, search: location.search } }}>Ver detalle</Link>
      </div>
    </article>
  )
}
