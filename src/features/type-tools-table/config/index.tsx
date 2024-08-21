import { MRT_ColumnDef } from 'material-react-table'
import { TypeTools, TypeToolsList } from 'entities/tools/type'
import { AutoCompleteTableEditField } from 'shared/ui/autocomplete-table-edit-field'

export const typeToolsEducationTableConfig: MRT_ColumnDef<TypeTools>[] = [
    {
        accessorKey: 'name',
        header: 'Название'
    },
    {
        accessorKey: 'kind_name',
        header: 'Вид',
        Edit: ({ row }) => {
            return <AutoCompleteTableEditField<TypeTools>
                entityName={'type'}
                AutoCompleteStore={TypeToolsList}
                row={row}
                label={'Тип оборудования'}
                onChangeEditField={(rowId, rowName) => {
                    row._valuesCache['type_id'] = rowId
                    row._valuesCache['type_name'] = rowName
                }} />
        }
    }
]
