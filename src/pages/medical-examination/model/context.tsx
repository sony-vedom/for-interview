import { createContext, useContext } from 'react'
import { MedicalExaminationPageStore } from 'pages/medical-examination/model/store.ts'

export const MedicalExaminationStoreContext = createContext<null | MedicalExaminationPageStore>(
    null
)

export const { Provider: MedicalExaminationProvider } = MedicalExaminationStoreContext

export const useMedicalExaminationPage = () => {
    const store = useContext(MedicalExaminationStoreContext)
    if (!store) {
        throw new Error("Provider must be used")
    }
    return store
}
