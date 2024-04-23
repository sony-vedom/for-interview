import type { FC } from "react"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import type { DatePickerProps } from "@mui/x-date-pickers/DatePicker"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import type {Dayjs} from "dayjs"

import "dayjs/locale/ru"

export const BasicDatePicker: FC<DatePickerProps<Dayjs>> = (props) => {
  return (
    <LocalizationProvider adapterLocale="ru" dateAdapter={AdapterDayjs}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <DatePicker {...props} />
    </LocalizationProvider>
  )
}
