import { type FC } from 'react'
import { observer } from 'mobx-react-lite'
import { useQualificationEducationPage } from 'pages/qualification-education/model'
import { QualificationEducationTable } from 'features/qualification-education-table'

export const UserQualificationEducationTable: FC = observer(() => {
    const {
        qualificationEducationTableStore,
        userStore,
        nameTypeQualificationEducation,
        nameTypeQualificationEducationListStore
    } = useQualificationEducationPage()

    return (
        <QualificationEducationTable
            userId={userStore.user?.id}
            qualificationEducationTableStore={qualificationEducationTableStore}
            nameTypeSimpleEducationListStore={nameTypeQualificationEducationListStore}
            nameTypeQualificationEducationStore={nameTypeQualificationEducation}
        />
    )
})