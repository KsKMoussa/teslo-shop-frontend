import { TesloApi } from "@/assets/api/TesloApi"
import type { authResponse } from "../interfaces/auth.response"


export const loginAction = async (email: string, password: string): Promise<authResponse> => {

    try {

        const { data } = await TesloApi.post<authResponse>('/auth/login', {
            email: email,
            password: password
        })

        return data

    } catch (error) {
        throw error
    }

}