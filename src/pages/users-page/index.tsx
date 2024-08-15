import { type FC } from 'react'
import { HeadingPage } from 'shared/ui/heading-page'
import { ROUTES } from 'shared/config/routes'
import { UserTable } from './ui/table.tsx'
import { UsersPageProvider } from 'pages/users-page/model'
import { useUserListPageStore } from './model'

export const UsersPage: FC = () => {
    const navItemPathname = ROUTES.USERS
    const userPageStore = useUserListPageStore()
    return (
        <UsersPageProvider value={userPageStore}>
            <HeadingPage navItemPathname={navItemPathname} />
            <UserTable />
        </UsersPageProvider>
    )
}
