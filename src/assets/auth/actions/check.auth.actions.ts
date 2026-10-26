import { TesloApi } from "@/assets/api/TesloApi"
import type { authResponse } from "../interfaces/auth.response"


export const checkAuthAction = async (): Promise<authResponse> => {

    const token = localStorage.getItem('token')
    if (!token || token === 'undefined' || token === 'null') {
        throw new Error('No Token Found')
    }

    try {
        const { data } = await TesloApi.get<authResponse>('/auth/check-status')

        // Solo actualizar el token si viene uno nuevo válido
        if (data.token) {
            localStorage.setItem('token', data.token)
        }
        return data
    } catch (error) {
        // NO borrar el token aquí
        throw new Error('token expired or Not valid')
    }
}