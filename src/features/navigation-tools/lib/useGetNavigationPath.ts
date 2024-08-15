import { navItemType } from 'shared/lib/navigation'
import { matchPath, useLocation } from 'react-router-dom'
import { ROUTES } from 'shared/config/routes'

export const useGetNavigationPath = (navItems: navItemType[]) => {
    const location = useLocation()
    return [...navItems, {
        path: ROUTES.TOOLS
    }].find((el) => {
        return matchPath(`/${el.path}`, location.pathname) || matchPath(`/${ROUTES.TOOLS}/${el.path}`, location.pathname)
    })?.path
}