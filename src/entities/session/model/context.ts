import { User } from 'entities/user/item/@x'
import { createContext } from 'react'

export enum SessionStatus {
    AUTHENTICATED = "authenticated",
    PENDING = "pending",
    NOT_AUTHENTICATED = "not_authenticated"
}

export interface IAuthContext {
    user: User
    login: (data: User, redirectAfterLogin: () => void) => Promise<void>
    logout: (redirectAfterLogout: () => void) => void,
    sessionStatus: SessionStatus,
    updateSessionStatus: (sessionStatus: SessionStatus) => void,
}

export const AuthContext = createContext<IAuthContext | null>(null)
