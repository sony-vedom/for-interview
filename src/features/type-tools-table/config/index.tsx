import { MRT_ColumnDef } from 'material-react-table'
import { TypeTools } from 'entities/tools/type'
import { KindToolsCell, KindToolsEdit } from './kind-cell-edit.tsx'

export const typeToolsEducationTableConfig: MRT_ColumnDef<TypeTools>[] = [
    {
        accessorKey: 'name',
        header: 'Название'
    },
    {
        accessorKey: 'kind_id',
        header: 'Вид',
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
    }
]
