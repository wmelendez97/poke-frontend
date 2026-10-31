import { Link } from 'react-router-dom'

// Explica que la ruta solicitada no pertenece a las pantallas de Poke.
export function NotFoundPage() {
  return <main className="login-main"><section className="login-form"><h1>Página no encontrada</h1><p>Comprueba el enlace o vuelve al inicio de Poke.</p><Link className="button" to="/inicio">Ir al inicio</Link></section></main>
}
