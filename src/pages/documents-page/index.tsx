import { FC } from 'react'
import { HeadingPage } from 'shared/ui/heading-page'
import { DocumentsList } from 'pages/documents-page/documents-list.tsx'
import { BasePageLayout } from 'shared/ui/base-page-layout'
import { ROUTES } from 'shared/config/routes'

export const DocumentsPage: FC = () => {
    const navItemPathname = ROUTES.DOCUMENTS
    return (
        <BasePageLayout>
            <HeadingPage navItemPathname={navItemPathname} />
            <DocumentsList navItemPathname={navItemPathname} />
        </BasePageLayout>
    )
}
