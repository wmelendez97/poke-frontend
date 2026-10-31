import axios from 'axios'
import { environment } from '../config/environment'
import { installAuthInterceptors } from '../interceptors/auth.interceptor'

const httpClient = axios.create({ baseURL: environment.apiUrl, timeout: 15000 })

// Instala autenticación común para las peticiones de cada módulo.
installAuthInterceptors(httpClient)

export default httpClient
