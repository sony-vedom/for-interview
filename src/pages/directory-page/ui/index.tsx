import { FC } from 'react'
import { HeadingPage } from 'shared/ui/heading-page'
import { ROUTES } from 'shared/config/routes'
import { RecursiveListRouter } from 'shared/ui/recursive-list-router'

export const DirectoryPage: FC = () => {
    const navItemPathname = ROUTES.DIRECTORY
    return (
        <>
            <HeadingPage navItemPathname={navItemPathname} />
            <RecursiveListRouter navItemPathname={navItemPathname} />
        </>
    )
}
