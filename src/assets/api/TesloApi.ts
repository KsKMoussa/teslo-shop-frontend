
import axios from 'axios'


const TesloApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})


TesloApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`

    }
    return config

})

export { TesloApi }


TesloApi.interceptors.response.use(
    (response) => response,
    (error) => {
        const url = error.config?.url ?? ''
        const isAuthEndpoint = url.includes('/auth/')

        // No tocar nada relacionado con auth
        if (error.response?.status === 401 && !isAuthEndpoint) {
            // Solo marcar, no forzar logout desde aquí
            console.warn('401 en endpoint autenticado:', url)
        }

        return Promise.reject(error)
    }
)