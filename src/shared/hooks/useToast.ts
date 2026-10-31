import { useContext } from 'react'
import { ToastContext } from '../components/toast/toast.context'

// Devuelve la acción de mostrar un aviso compartido.
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast debe usarse dentro de ToastProvider.')
  return context
}
