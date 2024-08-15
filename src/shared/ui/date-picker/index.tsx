import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

type AppDatePickerProps = {
    fieldName: any,
    label: string,
    required?: boolean
    notMinDate?: boolean
    setDeltaMinDate?: number
    disableManual?: boolean
    clearable?: boolean
    [rest: string]: any
    value: string
    onChange: (date: string | undefined) => void
}

export function AppDatePicker(props: AppDatePickerProps) {
    const {
        fieldName,
        label,
        control,
        required,
        notMinDate,
        disableManual,
        clearable,
        setDeltaMinDate,
        value,
        onChange,
        ...rest
    } = props
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <DatePicker
                {...rest}
                // minDate={!notMinDate ? dayjs().subtract(setDeltaMinDate || 0, 'day') : undefined}
                label={label}
                value={value ? dayjs(value) : null}
                onChange={date => onChange(date?.format('YYYY-MM-DD'))}
                slotProps={{
                    textField: {
                        onKeyDown: disableManual ? (e: any) => {
                            e.preventDefault()
                        } : undefined,
                        // helperText: invalid && "Необходимо заполнить",
                        sx: {
                            bgcolor: 'white',
                            size: "small",
                            "& *": {
                                fontSize: '14px'
                            }, ...rest?.sx
                        },
                        error: false,
                        size: 'small',
                        fullWidth: true
                    },
                    actionBar: {
                        actions: clearable ? ['clear'] : []
                    }
                }}
            />
        </LocalizationProvider>
    )
}