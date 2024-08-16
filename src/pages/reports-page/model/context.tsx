import { createContext, useContext } from 'react'
import { ReportPageStore } from './store.ts'

export const ReportStoreContext = createContext<null | ReportPageStore>(
    null
)

export const { Provider: ReportsPageProvider } = ReportStoreContext

export const useReportPage = () => {
    const store = useContext(ReportStoreContext)
    if (!store) {
        throw new Error("Provider must be used")
    }
    return store
}

