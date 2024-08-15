import { createContext, useContext } from 'react'
import { CreateReportStore } from './page-store.ts'

export const CreateReportPageContext = createContext<null | CreateReportStore>(
    null
)

export const { Provider: CreateReportPageProvider } = CreateReportPageContext

export const useCreateReportPage = () => {
    const store = useContext(CreateReportPageContext)
    if (!store) {
        throw new Error("Provider must be used")
    }
    return store
}
