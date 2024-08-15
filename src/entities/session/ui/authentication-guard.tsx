import { type FC, type ReactNode } from 'react'
import { useSession } from 'entities/session'
import { observer } from 'mobx-react-lite'
import { Meta } from 'shared/api'

export const AuthenticationGuard: FC<{
    children: ReactNode
    pendingComponent: ReactNode
    redirectToLoginComponent: ReactNode
}> = observer((props) => {
    const { pendingComponent, redirectToLoginComponent, children } = props
    const store = useSession()

    if (store?.meta === Meta.LOADING || store?.meta === Meta.FETCHING) {
        return <>{pendingComponent}</>
    }

    if (store?.meta === Meta.ERROR || store?.meta === Meta.INITIAL) {
        return <>{redirectToLoginComponent}</>
    }

    return <>{children}</>
})
