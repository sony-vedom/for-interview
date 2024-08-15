import { createContext, useContext } from 'react'
import { ToolsPageStore } from 'pages/tools-page/model/store.ts'

export const ToolsPageStoreContext = createContext<null | ToolsPageStore>(
    null
)

export const { Provider: ToolsPageProvider } = ToolsPageStoreContext

export const useToolsPage = () => {
    const store = useContext(ToolsPageStoreContext)
    if (!store) {
        throw new Error("Provider must be used")
    }
    return store
}
