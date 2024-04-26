import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from 'app/layout'
import { LoginPage } from 'pages/login-page'
import { AuthenticationGuard, AuthorizationGuard } from 'entities/session'
import {
    navigationConfig,
    navigationProfileConfig
} from 'app/router/navigation.tsx'

export const routerConfig = createBrowserRouter([
    {
        path: '/',
        element: (
            <AuthenticationGuard
                pendingComponent={<>pending</>}
                redirectToLoginComponent={<Navigate to="/login" />}>
                <AuthorizationGuard>
                    <AppLayout />
                </AuthorizationGuard>
            </AuthenticationGuard>
        ),
        children: [
            { index: true, element: <Navigate to="/profile" /> },
            ...navigationConfig,
            ...navigationProfileConfig,
            {
                path: '/protected',
                element: <>Protected</>
            }
        ]
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/logout',
        element: <>Страница выхода</>
    }
])
