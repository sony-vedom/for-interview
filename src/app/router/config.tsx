import { Navigate } from 'react-router-dom'
import { AppLayout } from 'app/layout'
import { AuthenticationGuard, AuthorizationGuard } from 'entities/session'
import { navigationConfig } from 'app/router/navigation'
import { ROUTES } from 'shared/config/routes'
import { BasePageLayout } from 'shared/ui/base-page-layout'

export const routerConfig = [
    {
        path: '/',
        element: <AuthenticationGuard
            redirectToLoginComponent={<Navigate to={ROUTES.LOGIN} />}>
            <AuthorizationGuard>
                <AppLayout />
            </AuthorizationGuard>
        </AuthenticationGuard>,
        children: [
            { index: true, element: <Navigate to={ROUTES.DOCUMENTS} /> },
            {
                element: <BasePageLayout />,
                children: [
                    ...navigationConfig.base
                ]
            }
        ]
    },
    {
        path: ROUTES.LOGIN,
        lazy: async () => {
            let { LoginPage } = await import(
                'pages/login-page'
                )
            return { Component: LoginPage }
        }
    },
    {
        path: ROUTES.LOGOUT,
        lazy: async () => {
            let { LogoutPage } = await import(
                'pages/logout-page'
                )
            return { Component: LogoutPage }
        }
    }
]
