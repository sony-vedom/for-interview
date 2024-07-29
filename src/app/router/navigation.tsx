import { Outlet } from 'react-router-dom'
import { DocumentsPage } from 'pages/documents-page'
import { navItemType } from 'shared/lib/navigation'
import { ROUTES } from 'shared/config/routes'
import { ToolsPage } from 'pages/tools-page'

const base: navItemType[] = [
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
    },
    {
        path: ROUTES.TOTAL_TOOLS,
        element: <ToolsPage/>,
        displayName: 'Оборудование',
        children: [
            {
                displayName: "Оборудование",
                index: true,
                element: <></>
            },
            {
                displayName: 'Типы оборудования',
                path: ROUTES.KIND_TOOLS,
                element: (
                    <div style={{ border: '1px solid red' }}>
                        Отчет по ТБТ
                    </div>
                )
            },
            {
                displayName: 'Виды оборудования',
                path: ROUTES.TYPE_TOOLS,
                element: (
                    <div style={{ border: '1px solid red' }}>
                        Отчет по ТБТ
                    </div>
                )
            }
        ]
    }
]

const profile: navItemType[] = [
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
