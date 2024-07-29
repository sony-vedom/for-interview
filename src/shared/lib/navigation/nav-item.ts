import { RouteObject } from 'react-router-dom'
import { useNavData } from 'shared/lib/navigation/context.ts'

export type navItemType = RouteObject & {
    displayName?: string
    children?: navItemType[]
}

type getNavItemType = (
    navItems: navItemType[],
    searchString: string
) => navItemType | undefined

const recursiveSearch = (
    navItem: navItemType,
    searchString: string,
    getNavItem: getNavItemType
): navItemType | undefined => {
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
): navItemType | undefined => {
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
