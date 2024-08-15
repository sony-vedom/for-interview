import { FC } from 'react'
import { Box, Paper } from '@mui/material'
import { ROUTES } from 'shared/config/routes'
import { HeadingLevel, HeadingPage } from 'shared/ui/heading-page'
import { useMedicalExaminationPage } from 'pages/medical-examination/model'
import { observer } from 'mobx-react-lite'
import { MedicalExaminationTable } from 'features/medical-examination-table'

export const UserMedicalExaminationTable: FC = observer(() => {
    const navItemPathname = ROUTES.MEDICAL_EXAMINATION
    const {
        userStore: { user },
        medicalExaminationListStore,
        medicalExaminationStore
    } = useMedicalExaminationPage()
    return (
        <Paper
            sx={(theme) => ({
                padding: { md: '10px', xs: '5px' },
                minWidth: { md: '300px', xs: 'calc(100% - 21px)' },
                border: `1px solid ${theme.palette.primary.main}`,
                boxShadow: 3
            })}>
            <HeadingPage level={HeadingLevel.H2} navItemPathname={navItemPathname} />
            <Box
                sx={{
                    display: 'grid',
                    gap: '15px',
                    flex: 1,
                }}>
                <MedicalExaminationTable userId={user?.id} medicalExaminationStore={medicalExaminationStore}
                                         medicalExaminationListStore={medicalExaminationListStore} />
            </Box>
        </Paper>
    )
})