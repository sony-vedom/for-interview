import { type RouteObject } from 'react-router-dom'
import { DefectoscopistPage } from 'pages/defectoscopist-page'
import { navItem } from 'shared/lib/navigation'

export const navigationConfig: RouteObject[] = [
    {
        path: '/documents',
        element: <>Документы</>
    }
]

export const navigationProfileConfig: navItem[] = [
    {
        path: '/profile',
        displayName: 'Профиль',
        element: <DefectoscopistPage />
    }
]
