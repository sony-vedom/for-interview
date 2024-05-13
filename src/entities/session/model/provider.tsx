import { ReactNode, useMemo, useState } from 'react'
import { useLocalStorage } from 'shared/lib/localStorage'
import { AuthContext, type AuthContextProps, SessionStatus } from './context.ts'
import { User } from 'entities/user/item/@x'

export const AuthProvider = (props: { children: ReactNode }) => {
    const { children } = props
    const [user, setUser] = useLocalStorage('user', null)
    const [sessionStatus, setSessionStatus] = useState<SessionStatus>(() =>
        user ? SessionStatus.AUTHENTICATED : SessionStatus.NOT_AUTHENTICATED
    )

    const login = async (data: User, redirectAfterLogin: () => void) => {
        setUser(data)
        setSessionStatus(SessionStatus.AUTHENTICATED)
        redirectAfterLogin()
    }

    const logout = (redirectAfterLogout: () => void) => {
        setSessionStatus(SessionStatus.NOT_AUTHENTICATED)
        setUser(null)
        redirectAfterLogout()
    }
    const updateSessionStatus = (sessionStatus: SessionStatus) => {
        setSessionStatus(sessionStatus)
    }

    const value = useMemo(
        () => ({
            user,
            sessionStatus,
            updateSessionStatus,
            login,
            logout
        }),
        [user]
    )
    return (
        <AuthContext.Provider value={value satisfies AuthContextProps}>
            {children}
        </AuthContext.Provider>
    )
}
