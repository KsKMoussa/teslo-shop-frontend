import { createBrowserRouter, Navigate } from "react-router";
import { ShopLayout } from "./assets/shop/layouts/ShopLayout";
import { HomePages } from "./assets/shop/pages/home/HomePages";
import { ProductPages } from "./assets/shop/pages/product/ProductPages";
import { GenderPages } from "./assets/shop/pages/gender/GenderPages";
import { LoginPages } from "./assets/auth/pages/login/LoginPages";
import { RegisterPages } from "./assets/auth/pages/register/RegisterPages";
//import { AuthLayout } from "./assets/auth/layouts/AuthLayout";
//import { AdminLayout } from "./assets/admin/layouts/AdminLayout";
import { DashBoardPages } from "./assets/admin/pages/dashboard/DashBoardPages";
import { lazy } from "react";
import { AdminProductsPages } from "./assets/admin/pages/products/AdminProductsPages";
import { AdminProductPage } from "./assets/admin/pages/product/AdminProductPages";
import { AdminRoutes, NotAuthenticatedRoutes } from "./components/routes/ProtectedRoutes";


const AuthLayout = lazy(() => import('./assets/auth/layouts/AuthLayout'))
const AdminLayout = lazy(() => import('./assets/admin/layouts/AdminLayout'))


export const appRouter = createBrowserRouter([
    //Public router
    {
        path: '/',
        element: <ShopLayout />,
        children: [

            {
                index: true,
                element: <HomePages />
            },
            {
                path: 'product/:islog',
                element: <ProductPages />
            },
            {
                path: 'gender/:gender',
                element: <GenderPages />
            }
        ]

    },
    // Auth Router
    {
        path: '/auth',
        element: <NotAuthenticatedRoutes>
            <AuthLayout />,
        </NotAuthenticatedRoutes>,

        children: [

            {
                index: true,
                element: <Navigate to='/auth/login' />
            },

            {
                path: 'login',
                element: <LoginPages />
            },
            {
                path: 'register',
                element: <RegisterPages />
            }

        ]
    },
    // Admin router
    {
        path: '/admin',
        element: <AdminRoutes>
            <AdminLayout />,

        </AdminRoutes>,

        children: [
            {
                index: true,
                element: <DashBoardPages />
            },
            {
                path: 'products',
                element: <AdminProductsPages />
            },
            {
                path: 'products/:id',
                element: <AdminProductPage />
            }
        ]

    },
    {
        path: '*',
        element: <Navigate to='/' />

    }

])