import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';

const instance = axios.create({
    headers: {
        "Content-type": "application/json"
    }
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

export default instance;