import { navItemType } from 'shared/lib/navigation'
import { matchPath, useLocation } from 'react-router-dom'
import { ROUTES, ROUTES_PARAMS } from 'shared/config/routes'

export const useGetNavigationPath = (navItems: navItemType[]) => {
    const location = useLocation()
    return navItems.find((el) => {
        return matchPath(`/${ROUTES.USERS}/:${ROUTES_PARAMS.userId}/${el.path}/*`, location.pathname) || matchPath(`/${ROUTES.PROFILE}/${el.path}/*`, location.pathname)
    })?.path
}