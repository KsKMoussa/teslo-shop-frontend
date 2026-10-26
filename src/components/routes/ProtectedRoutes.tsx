

import { useAuthStore } from '@/assets/auth/store/auth.store'
import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'

export const AuthenticatedRoutes = ({ children }: PropsWithChildren) => {
    const { authStatus } = useAuthStore()
    if (authStatus == 'Checking') return null

    if (authStatus == 'not-authenticated') return <Navigate to='/auth/login' />
    return children

    // 'authenticated' | 'not-authenticated' | 'Checking'
}

export const NotAuthenticatedRoutes = ({ children }: PropsWithChildren) => {
    const { authStatus } = useAuthStore()
    if (authStatus == 'Checking') return null

    if (authStatus == 'authenticated') return <Navigate to='/' />
    return children

    // 'authenticated' | 'not-authenticated' | 'Checking'
}

export const AdminRoutes = ({ children }: PropsWithChildren) => {
    const { authStatus, isAdmin } = useAuthStore()
    if (authStatus == 'Checking') return null

    if (authStatus == 'not-authenticated') return <Navigate to='/auth/login' />

    if (!isAdmin()) return <Navigate to='/' />

    return children

    // 'authenticated' | 'not-authenticated' | 'Checking'
}
