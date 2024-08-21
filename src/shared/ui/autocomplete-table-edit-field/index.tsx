import { MRT_Row, MRT_RowData } from 'material-react-table'
import { observer } from 'mobx-react-lite'
import { Box } from '@mui/material'
import { AutoCompleteMobXField } from 'shared/ui/autocomplete'
import { Pagination } from 'shared/api'
import { LifeCycledModel, useLifecycledModelEffect, useMobXLocalStore } from 'shared/lib/mobx'

type Constructor<T = {}> = new (...args: any[]) => T;

export interface AutoCompleteStore extends Constructor<LifeCycledModel> {
    list: Pagination<any[]> | any[] | null;
}

interface AutoCompleteStoreInstance extends LifeCycledModel {
    list: Pagination<any[]> | any[] | null;
}

interface Props<T extends MRT_RowData> {
    row: MRT_Row<T>,
    onChangeEditField: (rowId: string | number, rowName: string) => void,
    entityName: string
    label: string
    AutoCompleteStore: Constructor<AutoCompleteStoreInstance>;
}

export const AutoCompleteTableEditField = observer(<T extends MRT_RowData>(props: Props<T>) => {
    const { row, entityName, onChangeEditField, label, AutoCompleteStore } = props
    const store = useMobXLocalStore(() => new AutoCompleteStore())
    const list = store.list && 'items' in store.list ? store.list.items : store.list

    useLifecycledModelEffect(store)
    return (
        <Box sx={{
            display: 'flex',
            gap: 1
        }}>
            <AutoCompleteMobXField data={list ?? undefined}
                                   label={label}
                                   defaultValue={row.original[`${entityName}_id`] && row.original[`${entityName}_name`] ? {
                                       id: row.original[`${entityName}_id`],
                                       name: row.original[`${entityName}_name`]
                                   } : undefined}
                                   onChangeParameterName={(rowId, rowName) => {
                                       onChangeEditField(rowId, rowName)
                                   }} />
        </Box>
    )
})
