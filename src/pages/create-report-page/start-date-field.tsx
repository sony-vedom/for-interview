import { FC } from 'react'
import { AppDatePicker } from 'shared/ui/app-data-picker'
import dayjs from 'dayjs'

export const StartDateField: FC = () => {
    const defaultValue = dayjs()
    return (
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
    )
}
