import { MRT_ColumnDef } from 'material-react-table'
import { TypeTools } from 'entities/tools/type'

export const typeToolsEducationTableConfig: MRT_ColumnDef<TypeTools>[] = [
    {
        accessorKey: 'name',
        header: 'Название',
    }
]
