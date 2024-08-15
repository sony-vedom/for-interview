import { Box } from '@mui/material'
import { DefaultParametersCard } from 'entities/default-parameter'
import { mockData } from 'pages/create-report-page/mockData.ts'
import { maxWidth } from 'pages/create-report-page/ui'
import { AppTextField } from 'shared/ui/app-text-field'
import { AutoCompleteControlled } from 'shared/ui/autocomplete'
import { useFormContext } from 'react-hook-form'
import { SelectField } from 'shared/ui/select'

export const DescriptionKitFields = () => {
    const { control } = useFormContext()
    return (
        <Box
            sx={{
                display: 'grid',
                width: '100%',
                justifyContent: { md: 'space-around' },
                gridTemplateColumns: {
                    lg: `1fr minmax(650px, 1fr)`
                },
                gap: { xl: 2, xs: 2 }
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
                <AppTextField
                    required
                    input_name={'kit_number'}
                    label={'Номер комплекта'}
                />
                <AutoCompleteControlled
                    data={[{
                        id: 1,
                        name: 'СБТ чета там'
                    }]}
                    required
                    control={control}
                    fieldName={'parameters_name'}
                    label={'Параметры комплекта'} />
                <SelectField items={[
                    {
                        id: 1,
                        name: 'Бывший в употреблении'
                    },
                    {
                        id: 2,
                        name: 'Новый'
                    }
                ]}
                             required
                             label={'Состояние'}
                             defaultValueId={2}
                             name={'kit_state'} />
            </Box>
            <DefaultParametersCard data={mockData} />
            {/*<DefaultParametersCard />*/}
        </Box>
    )
}