import type { FC } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import type { Dayjs } from 'dayjs'

import 'dayjs/locale/ru'

const customPtBRLocaleText = {
    clearButtonLabel: 'Очистить',
    acceptButtonLabel: 'Ок'
}

export const AppDatePicker: FC<DatePickerProps<Dayjs>> = (props) => {
    return (
        <LocalizationProvider
            localeText={customPtBRLocaleText}
            adapterLocale="ru"
            dateAdapter={AdapterDayjs}>
            <DatePicker {...props} />
        </LocalizationProvider>
    )
}
