import { Outlet } from 'react-router-dom'
import { DocumentsPage } from 'pages/documents-page'
import { navItem } from 'shared/lib/navigation'
import { ROUTES } from 'shared/config/routes'

const base: navItem[] = [
    {
        path: ROUTES.DOCUMENTS,
        element: <Outlet />,
        displayName: 'Документы',
        children: [
            {
                index: true,
                element: <DocumentsPage />
            },
            {
                displayName: 'Отчеты по комплектам труб',
                children: [
                    {
                        displayName: 'Отчеты по СБТ',
                        path: ROUTES.SBT,
                        lazy: async () => {
                            let { SbtReportPage } = await import(
                                'pages/sbt-page'
                            )
                            return { Component: SbtReportPage }
                        }
                    },
                    {
                        displayName: 'Отчеты по ТБТ',
                        path: ROUTES.TBT,
                        element: (
                            <div style={{ border: '1px solid red' }}>
                                Отчет по ТБТ
                            </div>
                        )
                    },
                    {
                        displayName: 'Отчеты по УБТ',
                        path: ROUTES.UBT,
                        element: (
                            <div style={{ border: '1px solid red' }}>
                                Отчет по УБТ
                            </div>
                        )
                    }
                ]
            }
        ]
    }
]

const profile: navItem[] = [
    {
        path: ROUTES.PROFILE,
        displayName: 'Профиль',
        lazy: async () => {
            let { UserPage } = await import('pages/user-page')
            return { Component: UserPage }
        }
    }
]

export const navigationConfig = {
    base,
    profile
}
