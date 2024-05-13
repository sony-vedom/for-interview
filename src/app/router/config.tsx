import { Navigate } from 'react-router-dom'
import { AppLayout } from 'app/layout'
import { LoginPage } from 'pages/login-page'
import { AuthenticationGuard, AuthorizationGuard } from 'entities/session'
import { navigationConfig } from 'app/router/navigation.tsx'
import { ROUTES } from 'shared/config/routes'

export const routerConfig = [
    {
        path: '/',
        element: (
            <AuthenticationGuard
                pendingComponent={<>pending</>}
                redirectToLoginComponent={<Navigate to={ROUTES.LOGIN} />}>
                <AuthorizationGuard>
                    <AppLayout />
                </AuthorizationGuard>
            </AuthenticationGuard>
        ),
        children: [
            { index: true, element: <Navigate to={ROUTES.DOCUMENTS} /> },
            ...navigationConfig.base,
            ...navigationConfig.profile,
            {
                path: ROUTES.CREATE_REPORT,
                displayName: 'Начало создания отчета',
                lazy: async () => {
                    let { CreateReportPage } = await import(
                        'pages/create-report-page'
                    )
                    return { Component: CreateReportPage }
                }
            }
        ]
    },
    {
        path: ROUTES.LOGIN,
        element: <LoginPage />
    },
    {
        path: ROUTES.LOGOUT,
        element: <>Страница выхода</>
    }
]
