import { RouterProvider } from "react-router"
import { appRouter } from "./app.router"
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import type { PropsWithChildren } from "react"
import { useAuthStore } from "./assets/auth/store/auth.store"
//import { checkAuthAction } from "./assets/auth/actions/check.auth.actions"



const queryClient = new QueryClient()

const CheckoutProvider = ({ children }: PropsWithChildren) => {

    const { checkOutStatus } = useAuthStore()

    const { isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: checkOutStatus,
        retry: false,
        refetchInterval: 1000 * 60 * 60 * 1.5,
        refetchOnWindowFocus: true
    })

    if (isLoading) return <h1>loading</h1>
    return children

}


export const TesloShopApp = () => {



    return (

        <QueryClientProvider client={queryClient}>
            <Toaster />

            <CheckoutProvider>
                <RouterProvider router={appRouter} />
            </CheckoutProvider>


            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>

    )
}



