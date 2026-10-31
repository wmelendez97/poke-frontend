import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { getErrorMessage } from '../../core/api/apiResponse.model'
import { useAuth } from '../../core/auth/useAuth'
import { StatusPanel } from '../../shared/components/status-panel/StatusPanel'
import { getGlobalSearchHistory, getUserSearchHistory } from './history.service'
import { translateSearchType, type SearchHistoryEntry } from './history.model'

const PAGE_SIZE = 25

// Carga y filtra las consultas propias o el historial global.
export function HistoryPage() {
  const { user } = useAuth()
  const [mode, setMode] = useState<'personal' | 'global'>('personal')
  const [entries, setEntries] = useState<SearchHistoryEntry[]>([])
  const [filters, setFilters] = useState({ from: '', to: '', type: '', q: '' })
  const [submittedFilters, setSubmittedFilters] = useState({ from: '', to: '', type: '', q: '' })
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    // Actualiza la lista al cambiar vista, filtros o usuario.
    async function loadHistory() {
      if (mode === 'personal' && !user) return
      setLoading(true)
      setError('')
      try {
        const result = mode === 'personal'
          ? await getUserSearchHistory(user!.id)
          : await getGlobalSearchHistory(submittedFilters)
        if (active) setEntries(result)
      } catch (cause) {
        if (active) setError(getErrorMessage(cause, 'No pudimos cargar el historial.'))
      } finally {
        if (active) setLoading(false)
      }
    }
    void loadHistory()
    return () => { active = false }
  }, [mode, submittedFilters, user])

  // Aplica filtros a la consulta global desde el formulario.
  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (filters.from && filters.to && filters.from > filters.to) {
      setError('La fecha inicial debe ser anterior o igual a la fecha final.')
      return
    }
    setError('')
    setPage(0)
    setSubmittedFilters(filters)
  }

  // Cambia de vista y reinicia la página visible.
  function changeMode(nextMode: 'personal' | 'global') {
    setError('')
    setPage(0)
    setMode(nextMode)
  }

  const visibleEntries = useMemo(() => entries.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE), [entries, page])
  const pageCount = Math.max(1, Math.ceil(entries.length / PAGE_SIZE))

  return (
    <>
      <header className="page-header"><div><h1>Historial de consultas</h1><p>Revisa búsquedas y consultas realizadas en Poke.</p></div></header>
      <div className="history-tabs" role="group" aria-label="Vista del historial">
        <button className="button button-secondary" type="button" aria-pressed={mode === 'personal'} onClick={() => changeMode('personal')}>Mi historial</button>
        <button className="button button-secondary" type="button" aria-pressed={mode === 'global'} onClick={() => changeMode('global')}>Historial global</button>
      </div>
      {mode === 'global' && <form className="panel filter-panel" onSubmit={applyFilters}>
        <div className="field"><label htmlFor="history-from">Desde</label><input id="history-from" type="date" value={filters.from} onChange={(event) => setFilters({ ...filters, from: event.target.value })} /></div>
        <div className="field"><label htmlFor="history-to">Hasta</label><input id="history-to" type="date" value={filters.to} onChange={(event) => setFilters({ ...filters, to: event.target.value })} /></div>
        <div className="field"><label htmlFor="history-type">Consulta</label><select id="history-type" value={filters.type} onChange={(event) => setFilters({ ...filters, type: event.target.value })}><option value="">Todas</option><option value="pagination">Paginación</option><option value="detail">Detalle</option><option value="search">Búsqueda</option><option value="abilities">Habilidades</option><option value="moves">Movimientos</option><option value="types">Tipos</option></select></div>
        <div className="field"><label htmlFor="history-query">Texto</label><input id="history-query" value={filters.q} onChange={(event) => setFilters({ ...filters, q: event.target.value })} placeholder="Nombre o consulta" /></div>
        <button className="button" type="submit">Filtrar</button>
      </form>}
      {error ? <StatusPanel title="No se pudo cargar el historial" message={error} error action={mode === 'global' ? <button className="button" onClick={() => setSubmittedFilters({ ...submittedFilters })}>Reintentar</button> : undefined} />
        : loading ? <StatusPanel title="Cargando historial" message="Consultando las búsquedas guardadas." />
          : entries.length === 0 ? <StatusPanel title="Todavía no hay consultas" message="Las consultas que realices aparecerán aquí." />
            : <><section className="history-list" aria-label="Consultas recientes">{visibleEntries.map((entry) => <article className="panel history-item" key={entry.id}><strong>{translateSearchType(entry.searchType)}</strong><span>{entry.queryValue || entry.endpoint}</span><time dateTime={entry.createdAt}>{new Intl.DateTimeFormat('es', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(entry.createdAt))}</time><span className={entry.success ? 'history-success' : 'history-failed'}>{entry.success ? 'Correcta' : `Fallida · ${entry.statusCode ?? 'error'}`}</span>{mode === 'global' && <span>Usuario: {entry.userIdentifier}</span>}</article>)}</section>
              {pageCount > 1 && <nav className="pagination" aria-label="Páginas del historial"><button className="button button-secondary" disabled={page === 0} onClick={() => setPage(page - 1)}>Anterior</button><span>Página {page + 1} de {pageCount} · {entries.length} consultas</span><button className="button button-secondary" disabled={page + 1 >= pageCount} onClick={() => setPage(page + 1)}>Siguiente</button></nav>}
            </>}
    </>
  )
}
