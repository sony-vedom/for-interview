import { type FC, type ReactNode, useContext } from 'react'
import { AuthContext, SessionStatus } from 'entities/session/model/context.ts'

export const AuthenticationGuard: FC<{
    children: ReactNode
    pendingComponent: ReactNode
    redirectToLoginComponent: ReactNode
}> = (props) => {
    const { pendingComponent, redirectToLoginComponent, children } = props
    const context = useContext(AuthContext)

    if (context?.sessionStatus === SessionStatus.NOT_AUTHENTICATED) {
        return <>{redirectToLoginComponent}</>
    }

    if (context?.sessionStatus === SessionStatus.PENDING)
        return <>{pendingComponent}</>

    return <>{children}</>
}
