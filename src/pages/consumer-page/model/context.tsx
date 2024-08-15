import { createContext, useContext } from 'react'
import { ConsumerPageStore } from './store.ts'

export const ConsumerStoreContext = createContext<null | ConsumerPageStore>(
    null
)

export const { Provider: ConsumerProvider } = ConsumerStoreContext

export const useConsumerPage = () => {
    const store = useContext(ConsumerStoreContext)
    if (!store) {
        throw new Error("Provider must be used")
    }
    return store
}
