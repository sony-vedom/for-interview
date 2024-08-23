import { MRT_ColumnDef } from 'material-react-table'
import { Contract } from 'entities/contract/item'
import { AutoCompleteTableEditField } from 'shared/ui/autocomplete-table-edit-field'
import { ConsumerListStore } from 'entities/consumer/item'

export const contractTableConfig: MRT_ColumnDef<Contract>[] = [
    {
        accessorKey: 'name',
        header: 'Название'
    },
    {
        accessorKey: 'consumer_name',
        header: 'Заказчик',
        minSize: 400,
        Edit: ({ row }) => {
            return <AutoCompleteTableEditField<Contract>
                entityName={'consumer'}
                AutoCompleteStore={ConsumerListStore}
                row={row}
                label={'Вид оборудования'}
                onChangeEditField={(rowId, rowName) => {
                    row._valuesCache['consumer_id'] = rowId
                    row._valuesCache['consumer_name'] = rowName
                }} />
        }
    }
]
