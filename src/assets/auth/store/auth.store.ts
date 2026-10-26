

import type { User } from '@/assets/interfaces/user.interface'
import { create } from 'zustand'
import { loginAction } from '../actions/login.action'
import { checkAuthAction } from '../actions/check.auth.actions'


type AuthStatus = 'authenticated' | 'not-authenticated' | 'Checking'

type AuthState = {

    //Properties
    user: User | null,
    token: string | null,
    authStatus: AuthStatus,
    isAdmin: () => boolean

    // Getters
    // isAdmin:()=> void

    //Actions
    login: (email: string, passworf: string) => Promise<Boolean>
    logout: () => void
    checkOutStatus: () => Promise<boolean>

}

export const useAuthStore = create<AuthState>()((set, get) => ({
    user: null,
    token: null,
    authStatus: 'Checking',

    //getters

    isAdmin: () => {
        const roles = get().user?.roles || []
        return roles?.includes('admin')
    },

    //Actions


    login: async (email: string, password: string) => {


        try {

            const data = await loginAction(email, password)
            localStorage.setItem('token', data.token)
            set({ user: data.user, token: data.token, authStatus: 'authenticated' })
            return true

        } catch (error) {
            set({ user: null, token: null, authStatus: 'not-authenticated' })
            //localStorage.removeItem('token')
            return false
        }

    },

    logout: () => {

        localStorage.removeItem('token')
        set({ user: null, token: null, authStatus: 'not-authenticated' })
    },

    checkOutStatus: async () => {
        try {

            const { user, token } = await checkAuthAction()
            set({
                user: user,
                token: token,
                authStatus: 'authenticated'
            })
            return true

        } catch (error) {
            set({
                user: null,
                token: null,
                authStatus: 'not-authenticated'
            })
            return false

        }
    }

}))

