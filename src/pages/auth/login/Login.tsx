import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { getErrorMessage } from '../../../core/api/apiResponse.model'
import { useAuth } from '../../../core/auth/useAuth'
import { StatusPanel } from '../../../shared/components/status-panel/StatusPanel'
import { useToast } from '../../../shared/hooks/useToast'

const loginSchema = z.object({ email: z.string().trim().email('Introduce un correo válido.'), password: z.string().min(1, 'Introduce tu contraseña.') })
type LoginValues = z.infer<typeof loginSchema>

// Presenta un formulario accesible para iniciar la sesión Poke.
export function Login() {
  const { signIn, user, isInitializing } = useAuth()
  const location = useLocation()
  const [formError, setFormError] = useState('')
  const { showToast } = useToast()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: '', password: '' } })
  const destination = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/inicio'

  // Envía credenciales y conserva los errores cerca del formulario.
  async function onSubmit(values: LoginValues) {
    setFormError('')
    try { await signIn(values); showToast('Sesión iniciada.', 'success') } catch (error) { setFormError(getErrorMessage(error, 'No pudimos iniciar sesión. Revisa tus credenciales e inténtalo de nuevo.')) }
  }

  if (isInitializing) return <StatusPanel title="Validando sesión" message="Un momento mientras comprobamos tu acceso." />
  if (user) return <Navigate to={destination} replace />

  return (
    <main className="login-screen">
      <section className="login-brand-panel" aria-label="Poke">
        <Link className="brand" to="/login"><span className="brand-mark" aria-hidden="true" />Poke</Link>
        <div className="login-ball" aria-hidden="true"><span /></div>
        <p>Descubre Pokémon, consulta sus habilidades y explora cada tipo.</p>
      </section>
      <section className="login-main">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1>¡Qué bueno verte!</h1>
          <p>Inicia sesión para entrar a tu Pokédex.</p>
          {formError && <div className="form-error" role="alert">{formError}</div>}
          <div className="field">
            <label htmlFor="login-email">Correo electrónico</label>
            <input id="login-email" autoComplete="username" type="email" inputMode="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'login-email-error' : undefined} {...register('email')} />
            {errors.email && <span id="login-email-error" className="field-error">{errors.email.message}</span>}
          </div>
          <div className="field">
            <label htmlFor="login-password">Contraseña</label>
            <input id="login-password" autoComplete="current-password" type="password" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'login-password-error' : undefined} {...register('password')} />
            {errors.password && <span id="login-password-error" className="field-error">{errors.password.message}</span>}
          </div>
          <button className="button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Ingresando…' : 'Iniciar sesión'}</button>
          <p>El acceso se valida con la cuenta registrada en Poke.</p>
        </form>
      </section>
    </main>
  )
}
