import type { FC } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import type { Dayjs } from 'dayjs'

import 'dayjs/locale/ru'
import { observer } from 'mobx-react-lite'
import { Field } from 'mobx-react-form'

const customPtBRLocaleText = {
    clearButtonLabel: 'Очистить',
    acceptButtonLabel: 'Ок'
}

interface AppDatePickerProps {
    field: Field
}

export const AppDatePicker: FC<DatePickerProps<Dayjs> & AppDatePickerProps> = observer((props) => {
    const { field, ...rest } = props
    console.log({
        ...field.bind({
            disabled: rest.disabled
        })
    })
    return (
        <LocalizationProvider
            localeText={customPtBRLocaleText}
            adapterLocale="ru"
            dateAdapter={AdapterDayjs}>
            <DatePicker {...props}
                        slotProps={{
                            ...props.slotProps,
                            textField: {
                                ...props?.slotProps?.textField,
                                ...field.bind({
                                    disabled: rest.disabled
                                })
                            }
                        }}
            />
        </LocalizationProvider>
    )
})
