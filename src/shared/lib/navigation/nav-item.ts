import { RouteObject } from 'react-router-dom'
import { useNavData } from 'shared/lib/navigation/context.ts'

export type navItem = RouteObject & {
    displayName?: string
    children?: navItem[]
}

type getNavItemType = (
    navItems: navItem[],
    searchString: string
) => navItem | undefined

const recursiveSearch = (
    navItem: navItem,
    searchString: string,
    getNavItem: getNavItemType
): navItem | undefined => {
    if (navItem.path === searchString) {
        return navItem
    }
    if (navItem.children) {
        return getNavItem(navItem.children, searchString)
    }
    return
}

const getNavItem: getNavItemType = (
    navItems,
    searchString
): navItem | undefined => {
    for (let i of navItems) {
        const findEl = recursiveSearch(i, searchString, getNavItem)
        if (findEl) {
            return findEl
        }
    }
    return
}

export const useNavItem = (pathName: string) => {
    const navData = useNavData()
    return getNavItem(navData, pathName)
}
