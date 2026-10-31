import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './core/auth/AuthContext'
import { AppRoutes } from './app/routes/AppRoutes'
import { ToastProvider } from './shared/components/toast/ToastProvider'
import './App.css'

// Monta la sesión compartida y el router de la aplicación.
function App() {
  return <BrowserRouter><ToastProvider><AuthProvider><AppRoutes /></AuthProvider></ToastProvider></BrowserRouter>
}

export default App
