import { FC } from 'react'
import { HeadingPage } from 'shared/ui/heading-page'
import { DocumentsList } from 'pages/documents-page/documents-list.tsx'
import { ROUTES } from 'shared/config/routes'

export const DocumentsPage: FC = () => {
    const navItemPathname = ROUTES.DOCUMENTS
    return (
        <>
            <HeadingPage navItemPathname={navItemPathname} />
            <DocumentsList navItemPathname={navItemPathname} />
        </>
    )
}
