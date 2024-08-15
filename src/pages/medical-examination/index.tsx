import { UserMedicalExaminationTable } from 'pages/medical-examination/ui'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { MedicalExaminationProvider, useUserMedicalExaminationStore } from 'pages/medical-examination/model'
import { useLifecycledModelEffect } from 'shared/lib/mobx'

export const MedicalExaminationPage = observer(() => {
    const { userId } = useParams()
    const userPageStore = useUserMedicalExaminationStore(userId ? Number(userId) : undefined)

    useLifecycledModelEffect(userPageStore)

    return (
        <MedicalExaminationProvider value={userPageStore}>
            <UserMedicalExaminationTable/>
        </MedicalExaminationProvider>
    )
})