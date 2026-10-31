import type { ReactNode } from 'react'

// Presenta carga, vacío o error con el mismo patrón accesible.
export function StatusPanel({ title, message, error = false, action }: { title: string; message: string; error?: boolean; action?: ReactNode }) {
  return <section className={`status-panel${error ? ' error' : ''}`} role={error ? 'alert' : 'status'}><h2>{title}</h2><p>{message}</p>{action}</section>
}
