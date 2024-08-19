import { createContext, useContext } from 'react'
import { ReportOnePageStore } from './store.ts'

export const ReportOneStoreContext = createContext<null | ReportOnePageStore>(
    null
)

export const { Provider: ReportOnePageProvider } = ReportOneStoreContext

export const useReportOnePage = () => {
    const store = useContext(ReportOneStoreContext)
    if (!store) {
        throw new Error("Provider must be used")
    }
    return store
}

