import { FC } from 'react'
import { HeadingPage } from 'shared/ui/heading-page'
import { ROUTES } from 'shared/config/routes'
import { RecursiveListRouter } from 'shared/ui/recursive-list-router'

export const DocumentsPage: FC = () => {
    const navItemPathname = ROUTES.DOCUMENTS
    return (
        <>
            <HeadingPage navItemPathname={navItemPathname} />
            <RecursiveListRouter navItemPathname={navItemPathname} />
        </>
    )
}
