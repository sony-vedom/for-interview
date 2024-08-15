import { createContext, useContext } from 'react'

import { SessionStore } from '../store'

export const SessionStoreContext = createContext<null | SessionStore>(
    null
)

export const { Provider: SessionProvider } = SessionStoreContext

export const useSession = () => {
    return useContext(SessionStoreContext)
}
