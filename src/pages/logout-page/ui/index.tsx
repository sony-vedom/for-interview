import { FC, useEffect } from 'react'
import { LoadingBox } from 'shared/ui/loading-box'
import { useSession } from 'entities/session'

export const LogoutPage: FC = () => {
    const session = useSession()
    useEffect(() => {
        session?.logout()
    }, [])
    return <LoadingBox/>
}
