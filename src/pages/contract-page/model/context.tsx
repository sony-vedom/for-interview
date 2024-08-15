import { createContext, useContext } from 'react'
import { ContractPageStore } from './store.ts'

export const ContractStoreContext = createContext<null | ContractPageStore>(
    null
)

export const { Provider: ContractProvider } = ContractStoreContext

export const useContractPage = () => {
    const store = useContext(ContractStoreContext)
    if (!store) {
        throw new Error("Provider must be used")
    }
    return store
}
