import { MRT_ColumnDef } from 'material-react-table'
import { KindTools } from 'entities/tools/kind'
import { AutoCompleteMobXField } from 'shared/ui/autocomplete'
import { ISelectData } from 'shared/ui/select-mobx'

const categories = [
    { id: 2, name: 2 },
    { id: 3, name: 3 },
    { id: 4, name: 4 },
    { id: 5, name: 5 }

]

export const kindToolsTableConfig: MRT_ColumnDef<KindTools>[] = [
    {
        accessorKey: 'name',
        header: 'Название'
    },
    {
        accessorKey: 'inspection_category_sbt',
        header: 'Категория (СБТ)',
        Edit: ({ row }) => {
            return <AutoCompleteMobXField
                data={categories as ISelectData[]
                }
                label={'Уровень'}
                defaultValue={row._valuesCache['inspection_category_sbt'] ? {
                    id: row._valuesCache['inspection_category_sbt'],
                    name: row._valuesCache['inspection_category_sbt']
                } : undefined}
                onChangeParameterName={(rowId, _) => {
                    row._valuesCache['inspection_category_sbt'] = rowId
                }} />
        }
    },
    {
        accessorKey: 'inspection_category_tbt_ubt',
        header: 'Категория (ТБТ и УБТ)',
        Edit: ({ row }) => {
            return <AutoCompleteMobXField
                data={[{ id: 1, name: 1 }, ...categories] as ISelectData[]}
                label={'Уровень'}
                defaultValue={row._valuesCache['inspection_category_tbt_ubt'] ? {
                    id: row._valuesCache['inspection_category_tbt_ubt'],
                    name: row._valuesCache['inspection_category_tbt_ubt']
                } : undefined}
                onChangeParameterName={(rowId, _) => {
                    row._valuesCache['inspection_category_tbt_ubt'] = rowId
                }} />
        }

    }
]
