import { Link } from 'react-router-dom'
import { useAuth } from '../../core/auth/useAuth'

// Da acceso directo al catálogo, tipos e historial de consultas.
export function Dashboard() {
  const { user } = useAuth()
  const name = user?.name || user?.username || 'explorador'
  return (
    <>
      <header className="page-header"><div><h1>¡Hola, {name}!</h1><p>¿Qué Pokémon quieres descubrir hoy?</p></div></header>
      <section className="type-grid" aria-label="Explora Poke">
        <Link className="type-card" to="/pokemon"><span><strong>Pokédex</strong><br /><small>Buscar y explorar Pokémon</small></span><span aria-hidden="true">→</span></Link>
        <Link className="type-card" to="/tipos"><span><strong>Tipos</strong><br /><small>Explorar tipos elementales</small></span><span aria-hidden="true">→</span></Link>
        <Link className="type-card" to="/historial"><span><strong>Historial</strong><br /><small>Consultar búsquedas recientes</small></span><span aria-hidden="true">→</span></Link>
      </section>
      <section className="panel data-section" style={{ marginTop: 24 }}><h2>Empieza tu aventura</h2><p>Encuentra un Pokémon por nombre o identificador. Abre su ficha para consultar estadísticas, habilidades y movimientos.</p><p style={{ marginTop: 16 }}><Link className="button" to="/pokemon">Abrir la Pokédex</Link></p></section>
    </>
  )
}
