import { User } from 'entities/user/item/@x'
import { createContext } from 'react'

export enum SessionStatus {
    AUTHENTICATED = "authenticated",
    PENDING = "pending",
    NOT_AUTHENTICATED = "not_authenticated"
}

export interface AuthContextProps {
    user: User
    login: (data: User, redirectAfterLogin: () => void) => Promise<void>
    logout: (redirectAfterLogout: () => void) => void,
    sessionStatus: SessionStatus,
    updateSessionStatus: (sessionStatus: SessionStatus) => void,
}

export const AuthContext = createContext<AuthContextProps | null>(null)
