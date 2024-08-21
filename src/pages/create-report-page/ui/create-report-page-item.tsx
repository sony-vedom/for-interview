import { type FC } from 'react'
import { SaveButton } from 'shared/ui/save-button'
import { AppDivider } from 'shared/ui/app-divider'
import { BasicDataFields } from 'pages/create-report-page/ui/basic-data-fields'
import { DescriptionKitFields } from 'pages/create-report-page/ui/description-kit-fields'
import { Box } from '@mui/material'
import { CreateReportPageProvider, useCreateReportStore } from '../model'
import { useLifecycledModelEffect } from 'shared/lib/mobx'
import { maxWidth } from 'pages/create-report-page/config'
import { StandardToolsFields } from 'pages/create-report-page/ui/standard-tools-fields'
import { UserField } from 'pages/create-report-page/ui/user-field'

export const CreateReportPageItem: FC = () => {

    const createReportStore = useCreateReportStore()
    useLifecycledModelEffect(createReportStore)
    const form = createReportStore.createReportForm
    return (
        <CreateReportPageProvider value={createReportStore}>
            <Box
                sx={{
                    display: 'grid',
                    padding: { xxl: 6, lg: 4, md: 3, xs: 2 },
                    justifyItems: 'center',
                    justifyContent: 'center',
                    gap: 2
                }}
                component={'form'}
                onSubmit={(evt) => {
                    form.onSubmit(evt).then(() => {

                    })
                }}>
                <UserField />
                <BasicDataFields />
                <AppDivider>ОПИСАНИЕ КОМПЛЕКТА</AppDivider>
                <DescriptionKitFields />
                <AppDivider>
                    СТАНДАРТЫ И ОБОРУДОВАНИЕ
                </AppDivider>
                <StandardToolsFields />
                <SaveButton
                    sx={{ mt: 5, width: '100%', maxWidth }}
                    loading={form.submitting}
                />
            </Box>
        </CreateReportPageProvider>
    )
}
