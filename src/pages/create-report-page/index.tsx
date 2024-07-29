import { Box } from '@mui/material'
import { HeadingPage } from 'shared/ui/heading-page'
import { ROUTES } from 'shared/config/routes'
import { FormProvider, useForm } from 'react-hook-form'
import { FC } from 'react'
import { SaveButton } from 'shared/ui/save-button'
import { AppDivider } from 'shared/ui/app-divider'
import { BasicDataFields } from 'pages/create-report-page/basic-data-fields'
import { DescriptionKitFields } from 'pages/create-report-page/description-kit-fields'
import { StandartFields } from 'pages/create-report-page/standart-fields'
import { ToolsFields } from 'pages/create-report-page/tools-fields'

export const maxWidth = '650px'

export const CreateReportPage: FC = () => {
    const methods = useForm()
    const onSubmit = (data: any) => console.log(data)
    return (
        <>
                <HeadingPage navItemPathname={ROUTES.CREATE_REPORT} />
                <FormProvider {...methods}>
                    <Box
                        sx={{
                            display: 'grid',
                            padding: { xxl: 6, lg: 4, md: 3, xs: 2 },
                            justifyItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                        }}
                        component={'form'}
                        onSubmit={methods.handleSubmit(onSubmit)}>
                        <BasicDataFields />
                        <AppDivider>ОПИСАНИЕ КОМПЛЕКТА</AppDivider>
                        <DescriptionKitFields />
                        <AppDivider>
                            ПРИМЕНЯЕМЫЕ СТАНДАРТЫ
                        </AppDivider>
                        <StandartFields />
                        <AppDivider>ИСПОЛЬЗУЕМОЕ ОБОРУДОВАНИЕ</AppDivider>
                        <ToolsFields/>
                        {/*потом сюда ниже добавить ещё на фетчинг когда кнопку блокировать*/}
                        <SaveButton
                            sx={{ mt: 5, width: '100%', maxWidth }}
                            loading={methods.formState.isSubmitting}
                        />
                    </Box>
                </FormProvider>
        </>
    )
}
