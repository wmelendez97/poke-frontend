import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../../core/auth/useAuth'

// Renderiza la cabecera, navegación y pie de las pantallas protegidas.
export function AppLayout() {
  const { user, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const userName = user?.name || user?.username || user?.email || 'Usuario'
  const initials = userName.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/inicio" aria-label="Poke, inicio"><span className="brand-mark" aria-hidden="true" />Poke</NavLink>
        <nav className={`primary-nav${menuOpen ? ' is-open' : ''}`} aria-label="Navegación principal">
          <NavLink to="/inicio" onClick={() => setMenuOpen(false)}>Inicio</NavLink>
          <NavLink to="/pokemon" onClick={() => setMenuOpen(false)}>Pokédex</NavLink>
          <NavLink to="/tipos" onClick={() => setMenuOpen(false)}>Tipos</NavLink>
          <NavLink to="/historial" onClick={() => setMenuOpen(false)}>Historial</NavLink>
        </nav>
        <div className="user-area"><span className="user-avatar" aria-hidden="true">{initials || 'U'}</span><span>{userName}</span><button className="button button-secondary" type="button" onClick={signOut}>Salir</button></div>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? '×' : '☰'}</button>
      </header>
      <main className="page-content"><Outlet /></main>
      <footer className="app-footer">Poke · Explora el mundo Pokémon</footer>
    </div>
  )
}
