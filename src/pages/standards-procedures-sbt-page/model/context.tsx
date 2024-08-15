import { createContext, useContext } from 'react'
import { StandardsProceduresSbtPageStore } from './store.ts'

export const StandardsProceduresSbtContext = createContext<null | StandardsProceduresSbtPageStore>(
    null
)

export const { Provider: StandardsProceduresSbtProvider } = StandardsProceduresSbtContext

export const useStandardsProceduresSbtPage = () => {
    const store = useContext(StandardsProceduresSbtContext)
    if (!store) {
        throw new Error("Provider must be used")
    }
    return store
}
