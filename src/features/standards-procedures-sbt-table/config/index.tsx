import { MRT_ColumnDef } from 'material-react-table'
import { StandardsProceduresSbt } from 'entities/standards-procedures-sbt'
import { AutoCompleteMobXField } from 'shared/ui/autocomplete'
import { ISelectData } from 'shared/ui/select'

const categories = [
    { id: 2, name: 2 },
    { id: 3, name: 3 },
    { id: 4, name: 4 },
    { id: 5, name: 5 }

]

export const standardsProceduresSbtTableConfig: MRT_ColumnDef<StandardsProceduresSbt>[] = [
    {
        accessorKey: 'standards_description',
        header: 'Описание стандартов'
    },
    {
        accessorKey: 'inspection_category',
        header: 'Категория инспекции',
        Edit: ({ row }) => {
            return <AutoCompleteMobXField
                data={categories as ISelectData[]}
                label={'Уровень'}
                defaultValue={row._valuesCache['inspection_category'] ? {
                    id: row._valuesCache['inspection_category'],
                    name: row._valuesCache['inspection_category']
                } : undefined}
                onChangeParameterName={(rowId, _) => {
                    row._valuesCache['inspection_category'] = rowId
                }} />
        }
    },
    {
        accessorKey: 'name',
        header: 'Итоговое название',
        enableEditing: false,
    },
]
