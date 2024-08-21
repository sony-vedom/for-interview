import { MRT_ColumnDef } from 'material-react-table'
import { Tool } from 'entities/tools/item'
import { AppDatePicker } from 'shared/ui/date-picker'
import dayjs from 'dayjs'
import { AutoCompleteTableEditField } from 'shared/ui/autocomplete-table-edit-field'
import { KindToolsList } from 'entities/tools/kind'
import { TypeToolsList } from 'entities/tools/type'

export const toolsTableConfig: MRT_ColumnDef<Tool>[] = [
    {
        accessorKey: 'kind_name',
        header: 'Вид оборудования',
        minSize: 400,
        Edit: ({ row }) => {
            return <AutoCompleteTableEditField<Tool>
                entityName={'kind'}
                AutoCompleteStore={KindToolsList}
                row={row}
                label={'Вид оборудования'}
                onChangeEditField={(rowId, rowName) => {
                    row._valuesCache['kind_id'] = rowId
                    row._valuesCache['kind_name'] = rowName
                }} />
        }
    },
    {
        accessorKey: 'type_name',
        header: 'Тип оборудования',
        minSize: 400,
        Edit: ({ row }) => {
            return <AutoCompleteTableEditField<Tool>
                entityName={'type'}
                AutoCompleteStore={TypeToolsList}
                row={row}
                label={'Тип оборудования'}
                onChangeEditField={(rowId, rowName) => {
                    row._valuesCache['type_id'] = rowId
                    row._valuesCache['type_name'] = rowName
                }} />
        }
    },
    {
        accessorKey: 'factory_number',
        header: 'Заводской номер',
        minSize: 200
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
