// Centraliza la dirección pública de la API Poke.
export const environment = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080',
} as const
