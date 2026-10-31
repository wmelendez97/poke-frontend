import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import { ToastContext } from './toast.context'

interface ToastMessage { id: number; text: string; kind: 'success' | 'error' }

// Muestra avisos temporales de éxito y error entre pantallas.
export function ToastProvider({ children }: PropsWithChildren) {
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const showToast = useCallback((text: string, kind: ToastMessage['kind'] = 'success') => setToast({ id: Date.now(), text, kind }), [])

  // Cierra el aviso después de dejar tiempo para leerlo.
  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(null), 4200)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const value = useMemo(() => ({ showToast }), [showToast])
  return <ToastContext.Provider value={value}>{children}{toast && <div className={`toast toast-${toast.kind}`} role={toast.kind === 'error' ? 'alert' : 'status'} key={toast.id}>{toast.text}<button type="button" aria-label="Cerrar aviso" onClick={() => setToast(null)}>×</button></div>}</ToastContext.Provider>
}
