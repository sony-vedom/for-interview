import { Box } from '@mui/material'
import { BasePageLayout } from 'shared/ui/base-page-layout'
import { HeadingPage } from 'shared/ui/heading-page'
import { ROUTES } from 'shared/config/routes'
import { FormProvider, useForm } from 'react-hook-form'
import { FC } from 'react'
import { ApplicationNumberField } from './application-number-field.tsx'
import { CustomerField } from './customer-field.tsx'
import { StartDateField } from './start-date-field.tsx'
import { PipeTypeField } from './pipe-type-field.tsx'
import { ParametersNameField } from './parameters-name-field.tsx'
import { KitNumberField } from './kit-number-field.tsx'
import { SaveButton } from 'shared/ui/save-button'
import { DefaultParametersCard } from 'entities/default-parameter'
import { KitStateField } from './kit-state-field.tsx'
import { mockData } from './mockData.ts'
import { AppDivider } from 'shared/ui/app-divider'
import { CategoriesField } from 'pages/create-report-page/categories-field.tsx'
import { AdditionalCategories } from 'pages/create-report-page/additional-categories.tsx'

const maxWidth = '650px'

export const CreateReportPage: FC = () => {
    const methods = useForm()
    const onSubmit = (data: any) => console.log(data)

    return (
        <>
            <BasePageLayout>
                <HeadingPage navItemPathname={ROUTES.CREATE_REPORT} />
                <FormProvider {...methods}>
                    <Box
                        sx={{
                            display: 'grid',
                            padding: { xl: 6, md: 3, xs: 2 },
                            justifyItems: 'center',
                            gap: 3
                        }}
                        component={'form'}
                        onSubmit={methods.handleSubmit(onSubmit)}>
                        <Box
                            sx={{
                                display: 'grid',
                                maxWidth: maxWidth,
                                gap: 2,
                                width: '100%'
                            }}>
                            <ApplicationNumberField />
                            <CustomerField />
                            <StartDateField />
                        </Box>
                        <AppDivider>ОПИСАНИЕ КОМПЛЕКТА</AppDivider>
                        <Box
                            sx={{
                                display: 'grid',
                                width: '100%',
                                justifyContent: { md: 'space-around' },
                                gridTemplateColumns: {
                                    xl: `minmax(100px, ${maxWidth}) 1fr`
                                },
                                gap: { xl: 3, xs: 2 }
                            }}>
                            <Box
                                sx={{
                                    display: 'grid',
                                    maxWidth,
                                    gap: 2,
                                    justifySelf: 'center',
                                    width: '100%',
                                    alignContent: 'start'
                                }}>
                                <PipeTypeField />
                                <ParametersNameField />
                                <KitNumberField />
                                <KitStateField />
                            </Box>
                            <DefaultParametersCard data={mockData} />
                        </Box>
                        <AppDivider>
                            ПРИМЕНЯЕМЫЕ СТАНДАРТЫ И ПРОЦЕДУРЫ
                        </AppDivider>
                        <Box
                            sx={{
                                display: 'grid',
                                maxWidth,
                                gap: 2,
                                justifySelf: 'center',
                                width: '100%',
                                alignContent: 'start'
                            }}>
                            <CategoriesField />
                            <AdditionalCategories />
                        </Box>
                        <AppDivider>ИСПОЛЬЗУЕМОЕ ОБОРУДОВАНИЕ</AppDivider>
                        {/*потом сюда ниже добавить ещё на фетчинг когда кнопку блокировать*/}
                        <SaveButton
                            sx={{ mt: 2, width: '100%', maxWidth }}
                            loading={methods.formState.isSubmitting}
                        />
                    </Box>
                </FormProvider>
            </BasePageLayout>
        </>
    )
}
