// Representa a la persona que devuelve la sesión autenticada.
export interface User {
  id: number
  username: string
  email: string
  name: string
}

// Representa los campos requeridos por el endpoint de login.
export interface LoginRequest {
  email: string
  password: string
}

// Representa el token JWT y el usuario que devuelve el login.
export interface AuthResponse {
  token: string
  user: User
}
