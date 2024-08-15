import { createContext, useContext } from 'react'
import { SbtRejectionStandardPageStore } from 'pages/sbt-rejection-standard-page/model/store.ts'

export const SbtRejectionStandardPageStoreContext = createContext<null | SbtRejectionStandardPageStore>(
    null
)

export const { Provider: SbtRejectionStandardProvider } = SbtRejectionStandardPageStoreContext

export const useSbtRejectionStandardPage = () => {
    const store = useContext(SbtRejectionStandardPageStoreContext)
    if (!store) {
        throw new Error("Provider must be used")
    }
    return store
}
