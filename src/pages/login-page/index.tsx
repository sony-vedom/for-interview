import { observer } from 'mobx-react-lite'
import { Navigate } from 'react-router-dom'
import { useSession } from 'entities/session'
import { LoadingBox } from 'shared/ui/loading-box'
import { useEffect } from 'react'
import { ROUTES } from 'shared/config/routes'

export const LoginPage = observer(() => {
    const sessionStoreContext = useSession()

    useEffect(() => {
        ;(async () => {
            localStorage.setItem('user', JSON.stringify({
                'id': 1,
                'login': 'vlad',
                'first_name': 'Тест',
                'last_name': 'Тестов',
                'second_name': 'Тестович',
                'position_id': 38,
                'is_superuser': true,
                role: {
                    edit: [
                        {
                            id: 1,
                            pathName: ROUTES.CONTRACTS
                        }
                    ],
                    read: [
                        {
                            id: 1,
                            pathName: ROUTES.CONTRACTS
                        }
                    ]
                }
            }))
            await sessionStoreContext?.init()
        })()
    }, [])

    if (sessionStoreContext?.viewer) {
        return <Navigate to={'/'} replace />
    }

    return (
        <LoadingBox />
    )
})
