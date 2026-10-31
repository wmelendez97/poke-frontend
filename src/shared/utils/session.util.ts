const SESSION_TOKEN_KEY = 'poke.session.token'

// Lee el token actual de la pestaña.
export function getSessionToken(): string | null {
  return window.sessionStorage.getItem(SESSION_TOKEN_KEY)
}

// Guarda el token para conservar la sesión únicamente en esta pestaña.
export function setSessionToken(token: string): void {
  window.sessionStorage.setItem(SESSION_TOKEN_KEY, token)
}

// Elimina el token cuando el usuario sale o pierde autorización.
export function clearSessionToken(): void {
  window.sessionStorage.removeItem(SESSION_TOKEN_KEY)
}
