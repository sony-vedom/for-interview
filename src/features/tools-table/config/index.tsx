import { MRT_ColumnDef } from 'material-react-table'
import { Tool } from 'entities/tools/item'
import { AppDatePicker } from 'shared/ui/date-picker'
import { KindToolsCell, KindToolsEdit } from 'features/tools-table/config/kind-cell-edit.tsx'
import { TypeToolsCell, TypeToolsEdit } from 'features/tools-table/config/type-cell-edit.tsx'
import dayjs from 'dayjs'

export const toolsTableConfig: MRT_ColumnDef<Tool>[] = [
    {
        accessorKey: 'kind_id',
        header: 'Вид оборудования',
        minSize: 400,
        Cell: ({ row }) => {
            const id = row.original.kind_id
            if (id) {
                return <KindToolsCell id={id} />
            }
            return null
        },
        Edit: ({ row }) => {
            const id = row.original.kind_id
            return <KindToolsEdit id={id} row={row} />
        }
    },
    {
        accessorKey: 'type_id',
        header: 'Тип оборудования',
        minSize: 400,
        Cell: ({ row }) => {
            const id = row.original.type_id
            if (id) {
                return <TypeToolsCell id={id} />
            }
            return null
        },
        Edit: ({ row }) => {
            const id = row.original.type_id
            return <TypeToolsEdit id={id} row={row} />
        }
    },
    {
        accessorKey: 'factory_number',
        header: 'Заводской номер',
        minSize: 200,
    },
    {
        accessorKey: 'start_date',
        header: 'Дата след. калибровки',
        accessorFn: (originalRow) => originalRow.start_date ? new Date(originalRow.start_date) : originalRow.start_date,
        Cell: ({ cell }) => cell.getValue<Date | null>() ? cell.getValue<Date>().toLocaleDateString() : cell.getValue<null>(),
        Edit: ({ row }) => {
            return (
                <AppDatePicker
                    defaultValue={dayjs(row.original.start_date)}
                    fieldName={'start_date'}
                    label={'Дата след. калибровки'}
                    onChange={(date) => {
                        row._valuesCache['start_date'] = date
                    }} />
            )
        },
        minSize: 250
    },
    {
        accessorKey: 'finish_date',
        header: 'Дата калибровки',
        accessorFn: (originalRow) => originalRow.finish_date ? new Date(originalRow.finish_date) : originalRow.finish_date,
        Cell: ({ cell }) => cell.getValue<Date | null>() ? cell.getValue<Date>().toLocaleDateString() : cell.getValue<null>(),
        Edit: ({ row }) => {
            return (
                <AppDatePicker
                    defaultValue={dayjs(row.original.finish_date)}
                    fieldName={'finish_date'}
                    label={'Дата калибровки'}
                    onChange={(date) => {
                        row._valuesCache['finish_date'] = date
                    }} />
            )
        },
        minSize: 250
    },
    {
        accessorKey: 'notes',
        header: 'Комментарий'
    },
    {
        accessorKey: 'sbt_report_id',
        header: 'Отчет',
        enableEditing: false
    }
]
