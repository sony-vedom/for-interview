import { useState } from 'react'
import { TopAppBar } from './top-app-bar.tsx'
import { NavDrawer } from './nav-drawer'
import { BottomAppBar } from './bottom-app-bar'
import { LogoButton } from './logo-button.tsx'
import { useSession } from 'entities/session'
import { navigationConfig } from 'app/router'

export const AppHeader = () => {
    const session = useSession()
    const [isDrawerMobileOpen, setIsDrawerMobileOpen] = useState(false)

    const handleDrawerToggle = () => {
        setIsDrawerMobileOpen((prevState) => !prevState)
    }

    const navItems = navigationConfig.flatMap((navEl) => {
        const findEl = session?.user.role.read?.find((el) =>
            navEl.path?.includes(el.pathName)
        )
        if (findEl) {
            return {
                displayName: navEl.displayName,
                path: findEl.pathName
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
