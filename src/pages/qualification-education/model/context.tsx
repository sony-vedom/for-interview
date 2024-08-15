import { createContext, useContext } from 'react'
import { QualificationEducationPageStore } from './store.ts'

export const QualificationEducationStoreContext = createContext<null | QualificationEducationPageStore>(
    null
)

export const { Provider: QualificationEducationProvider } = QualificationEducationStoreContext

export const useQualificationEducationPage = () => {
    const store = useContext(QualificationEducationStoreContext)
    if (!store) {
        throw new Error("Provider must be used")
    }
    return store
}
