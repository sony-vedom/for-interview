import { QualificationEducationTableItemType } from '../model'
import { baseEducationConfig } from 'shared/config/table/baseEducationConfig'
import { MRT_ColumnDef } from 'material-react-table'
import { AutoCompleteMobXField } from 'shared/ui/autocomplete'

export const qualificationEducationTableConfig: MRT_ColumnDef<QualificationEducationTableItemType>[] = [
    {
        accessorKey: 'type_name',
        header: 'Тип обучения',
        minSize: 250,
        enableEditing: false
    },
    {
        accessorKey: 'license_number',
        header: 'Номер удостоверения',
        minSize: 250
    },
    {
        accessorKey: 'level',
        header: 'Уровень',
        minSize: 350,
        Edit: ({ row }) => {
            return <AutoCompleteMobXField
                data={[
                    {
                        id: 1, name: 1
                    },
                    {
                        id: 2, name: 2
                    },
                    {
                        id: 3, name: 3
                    }
                ]}
                label={'Уровень'}
                defaultValue={row._valuesCache['level'] ? {
                    id: row._valuesCache['level'],
                    name: row._valuesCache['level']
                } : undefined}
                onChangeParameterName={(rowId, _) => {
                    row._valuesCache['level'] = rowId
                }} />
        }
    },
    // @ts-ignore
    ...baseEducationConfig
]
