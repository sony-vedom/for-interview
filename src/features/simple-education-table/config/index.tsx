import { SimpleEducationTableItemType } from '../model'
import { baseEducationConfig } from 'shared/config/table/baseEducationConfig'
import { MRT_ColumnDef } from 'material-react-table'

export const simpleEducationTableConfig: MRT_ColumnDef<SimpleEducationTableItemType>[] = [
    {
        accessorKey: 'type_name',
        header: 'Вид обучения',
        minSize: 300,
        enableEditing: false,
    },
    // @ts-ignore
    ...baseEducationConfig
]
