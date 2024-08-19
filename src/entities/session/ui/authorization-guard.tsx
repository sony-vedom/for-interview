import { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { hasArrMatchingProperty } from 'shared/lib/helpers'
import { useSession } from 'entities/session'

const aviableForAllPathnames = ['/profile', '/login', '/logout', '/', "/documents", "/report"]

export const AuthorizationGuard: FC<{
    children: ReactNode
}> = ({ children }) => {
    const store = useSession()

    const location = useLocation()

    const isAvailablePage = aviableForAllPathnames.includes(location.pathname)
        ? true
        : hasArrMatchingProperty(
            store?.viewer?.role?.read ?? [],
            'pathName',
            location.pathname
        )


    if (!isAvailablePage) {
        return <Navigate to="/404" replace />
    }
    return <>{children}</>
}
