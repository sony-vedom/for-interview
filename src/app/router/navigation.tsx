import { DefectoscopistPage } from 'pages/defectoscopist-page'
import { navItem } from 'shared/lib/navigation'
import { DocumentsPage } from 'pages/documents-page'
import { Outlet } from 'react-router-dom'

export const navigationConfig: navItem[] = [
    {
        path: '/documents',
        element: <Outlet />,
        displayName: 'Документы',
        children: [
            {
                index: true,
                element: <DocumentsPage />
            },
            {
                displayName: 'Шаблоны отчетов по трубам',
                children: [
                    {
                        displayName: 'Отчет по СБТ',
                        path: 'report-sbt',
                        element: (
                            <div style={{ border: '1px solid red' }}>
                                Отчет по СБТ
                            </div>
                        ),
                    },
                    {
                        displayName: 'Отчет по ТБТ',
                        path: 'report-tbt',
                        element: (
                            <div style={{ border: '1px solid red' }}>
                                Отчет по ТБТ
                            </div>
                        ),
                    },
                    {
                        displayName: 'Отчет по УБТ',
                        path: 'report-ubt',
                        element: (
                            <div style={{ border: '1px solid red' }}>
                                Отчет по УБТ
                            </div>
                        ),
                    }
                ]
            }
        ]
    }
]

export const navigationProfileConfig: navItem[] = [
    {
        path: '/profile',
        displayName: 'Профиль',
        element: <DefectoscopistPage />
    }
]
