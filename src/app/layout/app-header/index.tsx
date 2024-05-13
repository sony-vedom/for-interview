import { useState } from 'react'
import { TopAppBar } from './top-app-bar.tsx'
import { NavDrawer } from './nav-drawer'
import { BottomAppBar } from './bottom-app-bar'
import { LogoButton } from './logo-button.tsx'
import { useSession } from 'entities/session'
import { navigationConfig } from 'app/router'
import { hasArrMatchingProperty } from 'shared/lib/helpers'

export const AppHeader = () => {
    const session = useSession()
    const [isDrawerMobileOpen, setIsDrawerMobileOpen] = useState(false)

    const handleDrawerToggle = () => {
        setIsDrawerMobileOpen((prevState) => !prevState)
    }

    const navItems = navigationConfig.base.flatMap((navEl) => {
        const isFindEl = hasArrMatchingProperty(
            session?.user.role.read ?? [],
            'pathName',
            navEl.path!
        )
        if (isFindEl) {
            return {
                displayName: navEl.displayName,
                path: navEl.path!
            }
        }
        return []
    })

    return (
        <>
            <NavDrawer
                navItems={navItems}
                isDrawerMobileOpen={isDrawerMobileOpen}
                onDrawerToggle={handleDrawerToggle}
            />
            <TopAppBar onDrawerToggle={handleDrawerToggle}>
                <LogoButton />
            </TopAppBar>
            <BottomAppBar navItems={navItems} />
        </>
    )
}
