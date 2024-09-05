import { useState } from 'react'
import { TopAppBar } from './top-app-bar.tsx'
import { NavDrawer } from './nav-drawer'
import { BottomAppBar } from './bottom-app-bar'
import { useSession } from 'entities/session'
import { navigationConfig } from 'app/router'
import { getNavItems } from 'app/router/getNavItems.ts'
import { AvatarArea } from 'widgets/avatar-area'

export const AppHeader = () => {
    const session = useSession()
    const [isDrawerMobileOpen, setIsDrawerMobileOpen] = useState(false)

    const handleDrawerToggle = () => {
        setIsDrawerMobileOpen((prevState) => !prevState)
    }

    const navItems = getNavItems(navigationConfig.base, session?.viewer)

    return (
        <>
            <NavDrawer
                navItems={navItems}
                isDrawerMobileOpen={isDrawerMobileOpen}
                onDrawerToggle={handleDrawerToggle}
            />
            <TopAppBar onDrawerToggle={handleDrawerToggle}>
                <AvatarArea
                    navItems={[]}
                />
            </TopAppBar>
            <BottomAppBar navItems={navItems} />
        </>
    )
}
