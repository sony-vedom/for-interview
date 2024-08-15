import { FC, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { MRT_ColumnDef } from 'material-react-table'
import { TableActionsRow, TableActionsToolbar, TableBase } from 'shared/ui/table'
import { Meta } from 'shared/api'
import { kindToolsEducationTableConfig } from '../config'
import { KindTools, KindToolsList, KindToolStore } from 'entities/tools/kind'

export const KindToolsTable: FC<{
    kindToolStore: KindToolStore
    kindToolsListStore: KindToolsList
}> = observer((props) => {
    const {
        kindToolStore,
        kindToolsListStore
    } = props

    const list = kindToolsListStore.list
    const meta = kindToolsListStore.meta

    const columns = useMemo<MRT_ColumnDef<KindTools>[]>(
        () => kindToolsEducationTableConfig,
        [list]
    )
    return (
        <>
            <TableBase columns={columns}
                       data={list ?? []}
                       state={
                           {
                               isLoading: meta === Meta.LOADING || meta === Meta.INITIAL,
                               showProgressBars:
                                   meta === Meta.FETCHING
                           }
                       }
                       editDisplayMode={'row'}
                       createDisplayMode={'row'}
                       renderTopToolbarCustomActions={({ table }) =>
                           (
                               <TableActionsToolbar.Wrapper>
                                   {meta !== Meta.LOADING && meta !== Meta.INITIAL && <>
                                       <TableActionsToolbar.CreateButton
                                           createIconText={'Добавить вид оборудования'}
                                           handleCreate={() => {
                                               table.setCreatingRow(true)
                                           }}
                                       />
                                   </>}
                               </TableActionsToolbar.Wrapper>
                           )
                       }
                       enablePagination={false}
                       onEditingRowSave={({ row, values, table }) => {
                           kindToolStore.edit(row.original.id, { ...values }).then(() => {
                               table.setEditingRow(null)
                           })
                       }}
                       onCreatingRowSave={({ values, table }) => {
                           kindToolStore.create({
                               ...values,
                               inspection_category_tbt_ubt: values.inspection_category_tbt_ubt ? values.inspection_category_tbt_ubt : null
                           }).then(() => {
                               table.setCreatingRow(null)
                           })
                       }}
                       renderRowActions={({ row, table }) => {
                           return <TableActionsRow.Wrapper>
                               <TableActionsRow.DeleteButtonWithConfirmDialog
                                   entityNameText={'данные об оборудовании'}
                                   handleDelete={() => {
                                       kindToolStore.delete(row.original.id)
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