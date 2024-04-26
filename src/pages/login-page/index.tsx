import { useSession, SessionStatus } from 'entities/session'
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
                            displayName: 'Документы',
                            pathName: 'documents'
                        }
                    ],
                    read: [
                        {
                            id: 1,
                            displayName: 'Документы',
                            pathName: 'documents'
                        }
                    ]
                }
            },
            () => {}
        )
    }, [])

    if (context?.sessionStatus === SessionStatus.AUTHENTICATED) {
        return <Navigate to={'/'} replace/>
    }
    return <>Привет, я страничка логина</>
}
