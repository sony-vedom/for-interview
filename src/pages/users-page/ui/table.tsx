import { type FC, useMemo } from 'react'
import type { MRT_ColumnDef } from 'material-react-table'
import { observer } from 'mobx-react-lite'
import { User } from 'entities/user/item'
import { TableBase } from 'shared/ui/table'
import { Meta } from 'shared/api'
import { userTableConfig } from '../config'
import { useUserPage } from '../model'

export const UserTable: FC = observer(() => {
    const { userListStore, userStore } = useUserPage()
    const { list, meta } = userListStore
    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => userTableConfig,
        [list]
    )

    return (
        <TableBase columns={columns}
                   data={list ?? []}
                   enablePagination={false}
                   state={{
                       isLoading: meta === Meta.LOADING,
                       showProgressBars: meta === Meta.FETCHING
                   }}
                   editDisplayMode={'row'}
                   onEditingRowSave={({ row, values, table }) => {
                       userStore.edit(row.original.id, {
                           first_name: values.first_name,
                           second_name: values.second_name,
                           last_name: values.last_name,
                           position_id: values.position_id
                       }).then(() => {
                           table.setEditingRow(null)
                       })
                   }}
        />
    )
})