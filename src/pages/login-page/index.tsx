import { SessionStatus, useSession } from 'entities/session'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'

export const LoginPage = () => {
    const context = useSession()

    // TODO: Временное явление, убрать потом
    useEffect(() => {
        context?.login(
            {
                id: 1,
                username: 'username',
                role: {
                    id: 5,
                    name: 'Дефектоскопист',
                    edit: [
                        {
                            id: 1,
                            pathName: 'documents'
                        },
                        {
                            id: 2,
                            pathName: 'create_report'
                        }
                    ],
                    read: [
                        {
                            id: 1,
                            pathName: 'documents'
                        },
                        {
                            id: 2,
                            pathName: 'create_report'
                        }
                    ]
                }
            },
            () => {}
        )
    }, [])

    if (context?.sessionStatus === SessionStatus.AUTHENTICATED) {
        return <Navigate to={'/'} replace />
    }
    return <>Привет, я страничка логина</>
}
