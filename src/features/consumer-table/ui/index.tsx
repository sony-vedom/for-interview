import { FC, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { MRT_ColumnDef, MRT_Updater } from 'material-react-table'
import { TableActionsRow, TableActionsToolbar, TableBase } from 'shared/ui/table'
import { Meta } from 'shared/api'
import { consumerTableConfig } from '../config'
import { Consumer, ConsumerListStore, ConsumerStore } from 'entities/consumer/item'

export const ConsumerTable: FC<{
    consumerStore: ConsumerStore
    consumerListStore: ConsumerListStore
}> = observer((props) => {
    const {
        consumerStore,
        consumerListStore
    } = props

    const list = consumerListStore.list
    const meta = consumerListStore.meta

    const columns = useMemo<MRT_ColumnDef<Consumer>[]>(
        () => consumerTableConfig,
        [list]
    )

    const handlePaginationChange = (updater: MRT_Updater<{
        pageIndex: number,
        pageSize: number,
    }>) => {
        const res = updater instanceof Function ? updater({
            pageSize: consumerListStore?.pagination?.page_size!,
            pageIndex: consumerListStore?.pagination?.page_index!
        }) : updater
        consumerListStore?.setPagination({
            page_size: res.pageSize,
            page_index: res.pageIndex
        })
    }
    return (
        <>
            <TableBase columns={columns}
                       data={list?.items ?? []}
                       rowCount={list?.total}
                       state={
                           {
                               isLoading: meta === Meta.LOADING || meta === Meta.INITIAL,
                               showProgressBars:
                                   meta === Meta.FETCHING,
                               pagination: {
                                   pageSize: consumerListStore?.pagination?.page_size ?? 20,
                                   pageIndex: consumerListStore?.pagination?.page_index ?? 1
                               }
                           }
                       }
                       editDisplayMode={'row'}
                       createDisplayMode={'row'}
                       renderTopToolbarCustomActions={({ table }) =>
                           (
                               <TableActionsToolbar.Wrapper>
                                   {meta !== Meta.LOADING && meta !== Meta.INITIAL && <>
                                       <TableActionsToolbar.CreateButton
                                           createIconText={'Добавить заказчика'}
                                           handleCreate={() => {
                                               table.setCreatingRow(true)
                                           }}
                                       />
                                   </>}
                               </TableActionsToolbar.Wrapper>
                           )
                       }
                       onPaginationChange={handlePaginationChange}
                       onEditingRowSave={({ row, values, table }) => {
                           consumerStore.edit(row.original.id, { ...values }).then(() => {
                               table.setEditingRow(null)
                           })
                       }}
                       onCreatingRowSave={({ values, table }) => {
                           consumerStore.create({
                               ...values
                           }).then(() => {
                               table.setCreatingRow(null)
                           })
                       }}
                       renderRowActions={({ row, table }) => {
                           return <TableActionsRow.Wrapper>
                               <TableActionsRow.DeleteButtonWithConfirmDialog
                                   entityNameText={'заказчика'}
                                   handleDelete={() => {
                                       consumerStore.delete(row.original.id)
                                   }}
                               />
                               <TableActionsRow.EditButton
                                   handleEdit={() => {
                                       table.setEditingRow(row)
                                   }}
                               />
                           </TableActionsRow.Wrapper>
                       }
                       }
            />
        </>
    )
})