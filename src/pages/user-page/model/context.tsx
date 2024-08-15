import { createContext, useContext } from 'react'
import { UserPageStore } from 'pages/user-page/model/store.ts'

export const UsersPageStoreContext = createContext<null | UserPageStore>(
    null
)

export const { Provider: UserPageProvider } = UsersPageStoreContext

export const useUserPage = () => {
    const store = useContext(UsersPageStoreContext)
    if (!store) {
        throw new Error("Provider must be used")
    }
    return store
}
