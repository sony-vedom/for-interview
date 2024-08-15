import { Navigate } from 'react-router-dom'
import { AppLayout } from 'app/layout'
import { AuthenticationGuard, AuthorizationGuard } from 'entities/session'
import { navigationConfig } from 'app/router/navigation.tsx'
import { ROUTES } from 'shared/config/routes'
import { BasePageLayout } from 'shared/ui/base-page-layout'

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
            {
                element: <BasePageLayout />,
                children: [
                    ...navigationConfig.base,
                    {
                        path: ROUTES.CREATE_REPORT,
                        displayName: 'Начало создания отчета',
                        lazy: async () => {
                            let { CreateReportPage } = await import(
                                'pages/create-report-page/ui'
                                )
                            return { Component: CreateReportPage }
                        }
                    }
                ]
            },
            ...navigationConfig.user,
            ...navigationConfig.profile,
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
    }
]
