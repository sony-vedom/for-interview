import { FC, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { MRT_ColumnDef } from 'material-react-table'
import { TableActionsRow, TableActionsToolbar, TableBase } from 'shared/ui/table'
import { Meta } from 'shared/api'
import { typeToolsEducationTableConfig } from '../config'
import { TypeTools, TypeToolsList, TypeToolStore } from 'entities/tools/type'

export const TypeToolsTable: FC<{
    typeToolStore: TypeToolStore
    typeToolsListStore: TypeToolsList
}> = observer((props) => {
    const {
        typeToolStore,
        typeToolsListStore
    } = props

    const list = typeToolsListStore.list
    const meta = typeToolsListStore.meta

    const columns = useMemo<MRT_ColumnDef<TypeTools>[]>(
        () => typeToolsEducationTableConfig,
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
                                           createIconText={'Добавить тип оборудования'}
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
                           typeToolStore.edit(row.original.id, {
                               ...values
                           }).then(() => {
                               table.setEditingRow(null)
                           })
                       }}
                       onCreatingRowSave={({ table, values }) => {
                           typeToolStore.create({
                               ...values
                           }).then(() => {
                               table.setCreatingRow(null)
                           })
                       }}
                       renderRowActions={({ row, table }) => {
                           return <TableActionsRow.Wrapper>
                               <TableActionsRow.DeleteButtonWithConfirmDialog
                                   entityNameText={'тип оборудования'}
                                   handleDelete={() => {
                                       typeToolStore.delete(row.original.id)
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