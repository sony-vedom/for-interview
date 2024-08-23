import { MRT_ColumnDef } from 'material-react-table'
import { TypeTools } from 'entities/tools/type'
import { AutoCompleteTableEditField } from 'shared/ui/autocomplete-table-edit-field'
import { KindToolsList } from 'entities/tools/kind'

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
                AutoCompleteStore={KindToolsList}
                row={row}
                label={'Вид оборудования'}
                onChangeEditField={(rowId, rowName) => {
                    row._valuesCache['kind_id'] = rowId
                    row._valuesCache['kind_name'] = rowName
                }} />
        }
    }
]
