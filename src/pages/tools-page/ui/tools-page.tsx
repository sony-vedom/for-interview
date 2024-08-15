import { type FC } from 'react'
import { HeadingPage } from 'shared/ui/heading-page'
import { ROUTES } from 'shared/config/routes'
import { NavigationTools } from 'features/navigation-tools'
import { getNavItems } from 'app/router/getNavItems.ts'
import { navigationConfig } from 'app/router'
import { useSession } from 'entities/session'
import { Outlet } from 'react-router-dom'

export const ToolsPage: FC = () => {
    const navItemPathname = ROUTES.TOOLS
    const session = useSession()
    const navItems = getNavItems(navigationConfig.base[1].children!, session?.viewer)
    return (
        <>
            <HeadingPage navItemPathname={navItemPathname} />
            <NavigationTools navItems={navItems} />
            <Outlet/>
        </>
    )
}
