import { useCallback, useState } from 'react'

// Gestiona carga asíncrona y libera su estado aunque ocurra un error.
export function useLoading() {
  const [loading, setLoading] = useState(false)

  // Ejecuta una tarea mientras expone un indicador de carga.
  const run = useCallback(async <T,>(task: () => Promise<T>): Promise<T> => {
    setLoading(true)
    try { return await task() } finally { setLoading(false) }
  }, [])

  return { loading, run }
}
