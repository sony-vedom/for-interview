import { FC, ReactNode, useContext } from 'react'
import { AuthContext } from 'entities/session/model/context.ts'
import { Navigate, useLocation } from 'react-router-dom'
import { hasArrMatchingProperty } from 'shared/lib/helpers'

const aviableForAllPathnames = ['/profile', '/login', '/logout', '/']

export const AuthorizationGuard: FC<{
    children: ReactNode
}> = ({ children }) => {
    const context = useContext(AuthContext)
    const location = useLocation()

    const isAvailablePage = aviableForAllPathnames.includes(location.pathname)
        ? true
        : hasArrMatchingProperty(
              context?.user.role.read ?? [],
              'pathName',
              location.pathname
          )

    if (!isAvailablePage) {
        return <Navigate to="/404" replace />
    }
    return <>{children}</>
}
