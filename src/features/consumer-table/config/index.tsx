import { MRT_ColumnDef } from 'material-react-table'
import { Consumer } from 'entities/consumer/item'

export const consumerTableConfig: MRT_ColumnDef<Consumer>[] = [
    {
        accessorKey: 'name',
        header: 'Название'
    },
    {
        accessorKey: 'inn',
        header: 'ИНН'
    },
    {
        accessorKey: 'kpp',
        header: 'КПП'
    },
    {
        accessorKey: 'address',
        header: 'Адрес'
    },
    {
        accessorKey: 'director',
        header: 'Директор'
    }
]
