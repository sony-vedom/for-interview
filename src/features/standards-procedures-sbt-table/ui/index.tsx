import { FC, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { MRT_ColumnDef } from 'material-react-table'
import { TableActionsRow, TableActionsToolbar, TableBase } from 'shared/ui/table'
import { Meta } from 'shared/api'
import { standardsProceduresSbtTableConfig } from '../config'
import {
    StandardsProceduresSbt,
    StandardsProceduresSbtListStore,
    StandardsProceduresSbtStore
} from 'entities/standards-procedures-sbt'

export const StandardsProceduresSbtTable: FC<{
    standardsProceduresSbtStore: StandardsProceduresSbtStore
    standardsProceduresSbtListStore: StandardsProceduresSbtListStore
}> = observer((props) => {
    const {
        standardsProceduresSbtStore,
       standardsProceduresSbtListStore
    } = props

    const list = standardsProceduresSbtListStore.list
    const meta = standardsProceduresSbtListStore.meta

    const columns = useMemo<MRT_ColumnDef<StandardsProceduresSbt>[]>(
        () => standardsProceduresSbtTableConfig,
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
                                           createIconText={'Добавить категорию инспекции'}
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
                           standardsProceduresSbtStore.edit(row.original.id, { ...values }).then(() => {
                               table.setEditingRow(null)
                           })
                       }}
                       onCreatingRowSave={({ values, table }) => {
                           standardsProceduresSbtStore.create({
                               ...values,
                           }).then(() => {
                               table.setCreatingRow(null)
                           })
                       }}
                       renderRowActions={({ row, table }) => {
                           return <TableActionsRow.Wrapper>
                               <TableActionsRow.DeleteButtonWithConfirmDialog
                                   entityNameText={'категорию инспекции'}
                                   handleDelete={() => {
                                       standardsProceduresSbtStore.delete(row.original.id)
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