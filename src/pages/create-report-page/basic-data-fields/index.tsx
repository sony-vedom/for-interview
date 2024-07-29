import { AppTextField } from 'shared/ui/app-text-field'
import { type FC } from 'react'
import { Box } from '@mui/material'
import { maxWidth } from 'pages/create-report-page'
import { AppDatePicker } from 'shared/ui/app-data-picker'
import dayjs from 'dayjs'
import { AutoCompleteControlled } from 'shared/ui/autocomplete'
import { useFormContext } from 'react-hook-form'

export const BasicDataFields: FC = () => {
    const defaultValue = dayjs()
    const { control } = useFormContext()
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xl: 3, xs: 2 },
                alignItems: 'center',
                justifyContent: "center"

            }}>
            <Box sx={{
                display: 'grid',
                gap: 2,
                maxWidth,
                justifySelf: 'center',
                width: '100%',
            }}>
                <AppDatePicker
                    defaultValue={defaultValue}
                    label="Дата начала проведения дефектоскопии"
                    slotProps={{
                        textField: {
                            name: 'start_date',
                            required: true,
                            size: 'small'
                        }
                    }}
                />
                <AppTextField
                    required
                    input_name={'application'}
                    label={'Расположение'}
                />
                <AppTextField
                    required
                    input_name={'application'}
                    label={'Заказ-наряд №'}
                />
            </Box>
            <Box sx={{
                display: 'grid',
                gap: 2,
                maxWidth,
                justifySelf: 'center',
                width: '100%',
            }}>
                <AutoCompleteControlled
                    data={[{
                        id: 1,
                        name: 'Какой-то заказчик'
                    }]}
                    required
                    control={control}
                    fieldName={'customer'}
                    label={'Заказчик'} />
                <AutoCompleteControlled
                    data={[{
                        id: 1,
                        name: 'Договор лдаоывдлоалдывоа'
                    }]}
                    required
                    control={control}
                    fieldName={'agreement'}
                    label={'Договор'} />
                <AppTextField
                    required
                    input_name={'application'}
                    label={'Заявка'}
                />
            </Box>
        </Box>
    )
}
