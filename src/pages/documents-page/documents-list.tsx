import { type FC } from 'react'
import { useNavItem } from 'shared/lib/navigation'
import { RecursiveListRouterItem } from 'shared/ui/recursive-list-router-item'

export const DocumentsList: FC<{ navItemPathname: string }> = (props) => {
    const { navItemPathname } = props
    const navItem = useNavItem(navItemPathname)
    return (
        <>
            {navItem?.children?.map((el, i) => {
                if (el.index) return null
                return <RecursiveListRouterItem key={i} item={el} />
            })}
        </>
    )
}
