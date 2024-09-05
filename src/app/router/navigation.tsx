import { navItemType } from 'shared/lib/navigation'
import { ROUTES } from 'shared/config/routes'

const base: navItemType[] = [
    {
        path: ROUTES.DOCUMENTS,
        displayName: 'Документы',
        children: [
            {
                index: true,
                lazy: async () => {
                    let { DocumentsPage } = await import(
                        'pages/documents-page'
                        )
                    return { Component: DocumentsPage }
                }
            },
            {
                displayName: 'Договоры',
                path: ROUTES.CONTRACTS,
                lazy: async () => {
                    let { ContractPage } = await import(
                        'pages/contract-page'
                        )
                    return { Component: ContractPage }
                }
            }
        ]
    }
]





export const navigationConfig = {
    base,
}
