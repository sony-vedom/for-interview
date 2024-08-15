import type { MRT_ColumnDef } from 'material-react-table'
import { AppDatePicker } from 'shared/ui/date-picker'

export const baseEducationConfig: MRT_ColumnDef<{
    start_date: Date
    finish_date: Date
    notes: string | null
    is_expired: boolean
    id: number
}>[] = [
    {
        accessorKey: 'start_date',
        header: 'Дата аттестации',
        accessorFn: (originalRow) => originalRow.start_date ? new Date(originalRow.start_date) : originalRow.start_date,
        Cell: ({ cell }) => cell.getValue<Date|null>() ? cell.getValue<Date>().toLocaleDateString() : cell.getValue<null>(),
        Edit: ({ row }) => {
            return (
                <AppDatePicker
                    fieldName={'start_date'}
                    value={row._valuesCache['start_date']}
                    label={'Дата прохождения'}
                    onChange={(date) => {
                        row._valuesCache['start_date'] = date
                    }} />
            )
        },
        minSize: 250
    },
    {
        accessorKey: 'finish_date',
        header: 'Окончание аттестации',
        accessorFn: (originalRow) => originalRow.finish_date ? new Date(originalRow.finish_date) : originalRow.finish_date,
        Cell: ({ cell }) => cell.getValue<Date|null>() ? cell.getValue<Date>().toLocaleDateString() : cell.getValue<null>(),
        Edit: ({ row }) => {
            return (
                <AppDatePicker
                    fieldName={'finish_date'}
                    value={row._valuesCache['finish_date']}
                    label={'Дата прохождения'}
                    onChange={(date) => {
                        row._valuesCache['finish_date'] = date
                    }} />
            )
        },
        minSize: 250
    },
    {
        accessorKey: 'notes',
        header: 'Комментарий',
        minSize: 150
    },
    {
        accessorKey: 'file',
        header: 'Файл',
        minSize: 150
    }
]
