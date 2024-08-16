import { FC } from 'react'
import { HeadingPage } from 'shared/ui/heading-page'
import { ROUTES } from 'shared/config/routes'
import { Outlet } from 'react-router-dom'

export const CreateReportPage: FC = () => {
    return (
        <>
            <HeadingPage navItemPathname={ROUTES.CREATE_REPORT} />
            <Outlet/>
        </>
    )
}
