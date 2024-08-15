import { createContext, useContext } from 'react'
import { UsersListPageStore } from 'pages/users-page/model/store.ts'

export const UsersPageStoreContext = createContext<null | UsersListPageStore>(
    null
)

export const { Provider: UsersPageProvider } = UsersPageStoreContext

export const useUserPage = () => {
    const store = useContext(UsersPageStoreContext)
    if (!store) {
        throw new Error("Provider must be used")
    }
    return store
}
