import { MRT_ColumnDef } from 'material-react-table'
import { Contract } from 'entities/contract/item'
import { ConsumerCell, ConsumerEdit } from './consumer-cell-edit.tsx'

export const contractTableConfig: MRT_ColumnDef<Contract>[] = [
    {
        accessorKey: 'name',
        header: 'Название'
    },
    {
        accessorKey: 'consumer_id',
        header: 'Заказчик',
        minSize: 400,
        Cell: ({ row }) => {
            const id = row.original.consumer_id
            if (id) {
                return <ConsumerCell id={id} />
            }
            return null
        },
        Edit: ({ row }) => {
            const id = row.original.consumer_id
            return <ConsumerEdit id={id} row={row} />
        }
    }
]

