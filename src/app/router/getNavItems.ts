import { User } from 'entities/user/item'
import { hasArrMatchingProperty } from 'shared/lib/helpers'
import { navItemType } from 'shared/lib/navigation'

export const getNavItems = (navConfig: navItemType[], user?: User | null) => {
    return navConfig.flatMap((navEl) => {
        if (navEl.index) {
            return []
        }
        const isFindEl = hasArrMatchingProperty(
            user?.role?.read ?? [],
            'pathName',
            navEl.path!
        )
        if (isFindEl) {
            return navEl
        }
        return []
    })
}
