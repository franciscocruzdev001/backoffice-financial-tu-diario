import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';

const instance = axios.create({
    headers: {
        "Content-type": "application/json"
    },
    // Sin esto, si un servicio está caído y la conexión se queda "colgada"
    // en vez de rechazarse al instante, la promesa nunca resuelve ni
    // rechaza — el try/catch de quien llama nunca se dispara y la pantalla
    // se queda cargando para siempre, sin mostrar ningún error.
    timeout: 15000,
})

// Adjunta el token vigente en cada request (no al crear la instancia,
// ya que en ese momento aún no existe sesión iniciada).
instance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// TEMP: desactivado a petición del usuario (por ahora no validar expiración
// de sesión en web, lo va a agregar después). El JWT vence (ver
// JWT_EXPIRES_IN en authorizer/.env) pero el backend no guarda sesiones — la
// expiración solo se notaría cuando llegara un 401 en algún request. Sin
// esto, la app se queda mostrando lo último que cargó como si la sesión
// siguiera activa, aunque el token ya no sirva para nada.
// instance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error?.response?.status === 401 && useAuthStore.getState().isAuthenticated) {
//             // logout() pone isAuthenticated en false — Main.tsx ya redirige
//             // solo a /login en cuanto eso pasa.
//             useAuthStore.getState().logout();
//         }
//         return Promise.reject(error);
//     }
// );

export default instance;