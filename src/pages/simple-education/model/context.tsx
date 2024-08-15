import { createContext, useContext } from 'react'
import { SimpleEducationPageStore } from './store.ts'

export const SimpleEducationStoreContext = createContext<null | SimpleEducationPageStore>(
    null
)

export const { Provider: SimpleEducationProvider } = SimpleEducationStoreContext

export const useSimpleEducationPage = () => {
    const store = useContext(SimpleEducationStoreContext)
    if (!store) {
        throw new Error("Provider must be used")
    }
    return store
}
