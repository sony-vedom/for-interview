import { MRT_ColumnDef, MRT_Row } from 'material-react-table'
import { Tool } from 'entities/tools/item'
import { AppDatePicker } from 'shared/ui/date-picker'
import dayjs from 'dayjs'
import { KindToolsList } from 'entities/tools/kind'
import { TypeToolsList } from 'entities/tools/type'
import { Box } from '@mui/material'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { useLifecycledModelEffect } from 'shared/lib/mobx'
import { AutoCompleteMobXField } from 'shared/ui/autocomplete'
import { FC, useState } from 'react'

const EditTypeKindValue: FC<{ row: MRT_Row<Tool> }> = observer((props) => {
    const { row } = props
    const kindStore = useLocalObservable(() => new KindToolsList())
    useLifecycledModelEffect(kindStore)
    const typeStore = useLocalObservable(() => new TypeToolsList([
        { key: 'kind_id', value: row.original.kind_id }
    ]))
    useLifecycledModelEffect(typeStore)
    const [typeField, setTypeField] = useState<{
        id: string | number,
        name: string
    } | null>(() => {
        if (row.original.type_name) {
            return {
                id: row.original.type_id,
                name: row.original.type_name
            }
        }
        if (row._valuesCache['type_id']) {
            return {
                id: row._valuesCache['type_id'],
                name: row._valuesCache['type_name']
            }
        }
        return null
    })
    return (
        <Box sx={{
            display: 'flex',
            gap: '10px'
        }}>
            <AutoCompleteMobXField
                sx={{
                    minWidth: '320px'
                }}
                data={kindStore.list ?? undefined}
                label={'Вид оборудования'}
                key={row.original[`kind_name`]}
                defaultValue={row.original[`kind_id`] && row.original[`kind_name`] ? {
                    id: row.original[`kind_id`],
                    name: row.original[`kind_name`]
                } : undefined}
                onChangeParameterName={(rowId, rowName) => {
                    row._valuesCache['kind_id'] = rowId
                    row._valuesCache['kind_name'] = rowName
                    typeStore.setFilters([
                        { key: 'kind_id', value: rowId }
                    ])
                    setTypeField(null)
                }} />
            <AutoCompleteMobXField
                sx={{
                    minWidth: '200px'
                }}
                data={typeStore.list ?? undefined}
                label={'Тип оборудования'}
                key={row.original[`type_name`]}
                value={typeField}
                onChangeParameterName={(rowId, rowName) => {
                    row._valuesCache['type_id'] = rowId
                    row._valuesCache['type_name'] = rowName
                    setTypeField({
                        id: rowId,
                        name: rowName
                    })
                }} />
        </Box>
    )
})

export const toolsTableConfig: MRT_ColumnDef<Tool>[] = [
    {
        accessorFn: (originalRow) => originalRow.kind_name + ' ' + originalRow.type_name,
        header: 'Вид и тип оборудования',
        minSize: 550,
        Edit: ({ row }) => {
            return <EditTypeKindValue row={row} />
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
        accessorKey: 'in_active_report',
        header: 'В отчете?',
        Cell: ({ renderedCellValue }) => <>{renderedCellValue ? 'Да' : 'Нет'}</>,
        enableEditing: false
    }
]
